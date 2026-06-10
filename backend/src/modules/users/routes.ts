import { Router } from "express";
import { usersService } from "./service";

const router = Router();

router.get("/", async (req, res) => {
    const users = await usersService.getAll();
    res.json(users);
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