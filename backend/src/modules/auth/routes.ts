import { Router } from "express";
import { authService } from "./service";


const router = Router();


router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await authService.register(name, email, password);

        res.json(user);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.json(result);
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
});

router.get("/verify/:token", async (req, res) => {
    try {
        await authService.verify(req.params.token);
        res.send("Account verified");
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
});

export default router;