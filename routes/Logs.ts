import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const result = await prisma.logs.findMany({});
    res.json(result);
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

router.delete("/all", async (req, res) => {
    const result = await prisma.logs.deleteMany({})
    res.json(result)
});

export default router;
