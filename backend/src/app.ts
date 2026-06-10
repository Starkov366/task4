import express from "express";
import cors from "cors";
import fs from "fs";
import pool from "./config/db";
import authRoutes from '../src/modules/auth/routes'
import usersRoutes from '../src/modules/users/routes'
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

async function initDataBase() {
    const sql = fs.readFileSync("./src/database/schema.sql", "utf8");
    await pool.query(sql);
}

initDataBase();

export default app;