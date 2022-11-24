import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const groups = await prisma.groups.findMany();
    res.json(groups);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const group = await prisma.groups.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(group)
});

router.post("/", async (req, res) => {
    const { description } = req.body;
    const result = await prisma.groups.create({
        data: {
            description: String(description),
        },
    });
    res.json(result);
});

router.put("/", async (req, res) => {
    const { id, description } = req.body;
    const result = await prisma.groups.update({
        where: {
            id: Number(id),
        },
        data: {
            description: String(description),
        },
    });
    res.json(result);
});

router.delete("/", async (req, res) => {
    const { id } = req.query;
    const result = await prisma.groups.delete({
        where: {
            id: Number(id),
        },
    });
    res.json(result);
});

export default router;
