import jwt from "jsonwebtoken";
import { authRepository } from "./repository";
import crypto from "crypto";
import { sendVerificationEmail } from "../../services/mail";
import pool from "../../config/db";

export const authService = {
    async register(name: string, email: string, password: string) {
        const token = crypto.randomBytes(20).toString("hex");
    
        try {
            const user = await authRepository.createUser(
                name,
                email,
                password,
                token
            );
    
            await sendVerificationEmail(email, token);
    
            return user.rows[0];
    
        } catch (e: any) {
            if (e.code === "23505") {
                throw new Error("Email already exists");
            }
            throw e;
        }
    },

    async login(email: string, password: string) {
        const result = await authRepository.findByEmail(email);
    
        if (!result.rows.length) {
            throw new Error("User not found");
        }
    
        const user = result.rows[0];
    
        if (user.status === "blocked") {
            throw new Error("User is blocked");
        }
    
        if (user.status === "unverified") {
            throw new Error("User not verified");
        }
    
        if (user.password !== password) {
            throw new Error("Wrong password!!!");
        }
        await pool.query(
            `UPDATE users SET last_login = NOW() WHERE id = $1`,
            [user.id]
        );
    
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );
    
        return { token, user };
    },
    async verify(token: string) {
        const result = await authRepository.verifyUser(token);
    
        if (result.rowCount === 0) {
            throw new Error("Invalid token");
        }
    
        return { success: true };
    }
};