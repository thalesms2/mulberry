import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const result = await prisma.users.findUnique({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        const result = await prisma.users.findMany();
        res.json(result);
    }
});

router.post("/", async (req, res) => {
    const { name, password } = req.body;
    if (name) {
        const result = await prisma.users.create({
            data: {
                name: String(name),
                password: password ? String(password) : "0000",
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.put("/", async (req, res) => {
    const { id, name, password } = req.body;
    if (id) {
        const user = await prisma.users.findUnique({
            where: { id: Number(id)}
        })
        const result = await prisma.users.update({
            where: { id: Number(id) },
            data: {
                name: name ? String(name) : user.name,
                password: password ? String(password) : user.password
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const result = await prisma.users.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

export default router;
