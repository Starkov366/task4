import pool from "../../config/db";

export const usersRepository = {
    async getAll() {
        return pool.query(`
            SELECT id, name, email, status, last_login, created_at
            FROM users
            ORDER BY last_login DESC NULLS LAST
        `);
    },

    async block(ids: number[]) {
        return pool.query(
            `UPDATE users SET status = 'blocked' WHERE id = ANY($1)`,
            [ids]
        );
    },

    async unblock(ids: number[]) {
        return pool.query(
            `UPDATE users SET status = 'active' WHERE id = ANY($1)`,
            [ids]
        );
    },

    async delete(ids: number[]) {
        return pool.query(
            `DELETE FROM users WHERE id = ANY($1)`,
            [ids]
        );
    },

    async deleteUnverified() {
        return pool.query(
            `DELETE FROM users WHERE status = 'unverified'`
        );
    }
};