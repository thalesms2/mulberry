import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { code } = req.body;
    if (code) {
        const result = await prisma.citys.findUnique({
            where: { code: Number(code) },
        });
        res.json(result);
    } else {
        const result = await prisma.citys.findMany();
        res.json(result);
    }
});

router.post("/", async (req, res) => {
    const { name, codeState } = req.body;
    if (name && codeState) {
        const result = await prisma.citys.create({
            data: {
                name: String(name),
                state: {
                    connect: { code: String(codeState) },
                },
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

export default router;
