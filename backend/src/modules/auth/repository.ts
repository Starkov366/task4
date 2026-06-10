import pool from "../../config/db";

export const authRepository = {
    async createUser(name: string, email: string, password: string) {
        return pool.query(
            `INSERT INTO users(name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, status`,
            [name, email, password]
        );
    },

    async findByEmail(email: string) {
        return pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
    }
};