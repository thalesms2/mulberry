import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const result = await prisma.sellers.findUnique({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        const result = await prisma.sellers.findMany();
        res.json(result);
    }
});

router.post("/", async (req, res) => {
    const { name, comission } = req.body;
    if (name && comission) {
        const result = await prisma.sellers.create({
            data: {
                name: String(name),
                comission: Number(comission),
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.put("/", async (req, res) => {
    const { id, name, comission } = req.body;
    if (id) {
        const seller = await prisma.sellers.findUnique({
            where: { id: Number(id)}
        })
        const result = await prisma.sellers.update({
            where: { id: Number(id) },
            data: {
                name: name ? String(name) : seller.name,
                comission: comission ? String(comission) : seller.comission,
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
        const result = await prisma.sellers.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

export default router;
