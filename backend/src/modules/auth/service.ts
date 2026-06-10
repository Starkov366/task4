import jwt from "jsonwebtoken";
import { authRepository } from "./repository";

export const authService = {
    async register(name: string, email: string, password: string) {
        const user = await authRepository.createUser(name, email, password);
        return user.rows[0];
    },

    async login(email: string, password: string) {
        const result = await authRepository.findByEmail(email);

        if (!result.rows.length) {
            throw new Error("User not found");
        }

        const user = result.rows[0];

        if (user.password !== password) {
            throw new Error("Wrong password!!!");
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return { token, user };
    }
};