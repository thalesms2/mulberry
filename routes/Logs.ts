import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const result = await prisma.logs.findUnique({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.post("/", async (req, res) => {
    const { userId, type, description } = req.body;
    if (userId && type && description) {
        const result = await prisma.logs.create({
            data: {
                type: String(type),
                description: String(description),
                userId: Number(userId),
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.put("/", async (req, res) => {
    res.sendStatus(204);
});

router.delete("/", async (req, res) => {
    res.sendStatus(204);
});

export default router;
