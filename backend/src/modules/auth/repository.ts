import pool from "../../config/db";

export const authRepository = {
    async createUser(name:string, email:string, password:string, token:string) {
        return pool.query(
            `INSERT INTO users(name, email, password, status, verification_token)
             VALUES ($1, $2, $3, 'unverified', $4)`,
            [name, email, password, token]
        );
    },

    async findByEmail(email: string) {
        return pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
    },
    async verifyUser(token: string) {
        return pool.query(
            `UPDATE users
             SET status = 'active'
             WHERE verification_token = $1`,
            [token]
        );
    }
};