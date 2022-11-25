import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const result = await prisma.company.findUnique({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        const result = await prisma.company.findMany();
        res.json(result);
    }
});

router.post("/", async (req, res) => {
    const { name } = req.body;
    if (name) {
        const result = await prisma.company.create({
            data: { name: String(name) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.put("/", async (req, res) => {
    const { id, name } = req.body;
    if (id && name) {
        const result = await prisma.company.update({
            where: { id: Number(id) },
            data: {
                name: String(name),
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
        const result = await prisma.company.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

export default router;
