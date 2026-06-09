import express from "express";
import cors from "cors";
import fs from "fs";
import pool from "./config/db";

const app = express();

app.use(cors());
app.use(express.json());

async function initDataBase() {
    const sql = fs.readFileSync("./src/database/schema.sql", "utf8");
    await pool.query(sql);
}

initDataBase();

export default app;