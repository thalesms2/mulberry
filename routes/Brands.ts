import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const brand = await prisma.brands.findUnique({
            where: { id: Number(id) },
        });
        res.json(brand);
    } else {
        const brands = await prisma.brands.findMany();
        res.json(brands);
    }
});

router.post("/", async (req, res) => {
    const { description } = req.body;
    if (description) {
        const result = {
            return: await prisma.brands.create({
                data: { description: String(description) },
            }),
            log: await generateLog('CREATE', `BRAND ${description} CREATED`, 1)
        }
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.put("/", async (req, res) => {
    const { id, description } = req.body;
    if (id && description) {
        const result = {
            return: await prisma.brands.update({
                where: { id: Number(id) },
                data: { description: String(description) },
            }),
            log: await generateLog('EDIT', 'BRAND EDITED', 1)
        }
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
    if(id) {
        const result = await prisma.brands.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204)
    }
});

export default router;
