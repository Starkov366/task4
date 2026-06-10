import { Router } from "express";
import { usersService } from "./service";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.json(users);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
});

router.post("/block", async (req, res) => {
    await usersService.block(req.body.ids);
    res.json({ ok: true });
});

router.post("/unblock", async (req, res) => {
    await usersService.unblock(req.body.ids);
    res.json({ ok: true });
});

router.post("/delete", async (req, res) => {
    await usersService.delete(req.body.ids);
    res.json({ ok: true });
});

router.post("/delete-unverified", async (req, res) => {
    await usersService.deleteUnverified();
    res.json({ ok: true });
});

export default router;