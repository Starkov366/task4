import express from "express";
import cors from "cors";

import authRoutes from "../src/modules/auth/routes";
import usersRoutes from "../src/modules/users/routes";

import { Request, Response, NextFunction } from "express";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);


app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error("ErROR:", err);

    res.status(500).json({
        error: "Internal error",
    });
});

export default app;