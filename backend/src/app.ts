import express from "express";
import cors from "cors";

import authRoutes from '../src/modules/auth/routes'
import usersRoutes from '../src/modules/users/routes'
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);





export default app;