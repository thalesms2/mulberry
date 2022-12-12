import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

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
        const city = await prisma.citys.create({
            data: {
                name: String(name),
                state: {
                    connect: { code: String(codeState) },
                },
            },
        });
        const result = {
            city: city,
            log: await generateLog(
                'CREATE',
                `CITY ${city.code} - ${city.name}-${city.statesCode} CREATED`,
                Number(req.cookies.userId)
            )
        }
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.put("/", async (req, res) => {
    const { code, name, codeState } = req.body;
    if (code) {
        const city = await prisma.citys.findUnique({
            where: { code: Number(code) }
        })
        const result = await prisma.citys.update({
            where: {
                code: Number(code),
            },
            data: {
                name: name ? String(name) : city.name,
                statesCode: codeState ?  String(codeState) : city.statesCode,
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.delete("/", async (req, res) => {
    const { code } = req.body;
    if (code) {
        const result = await prisma.citys.delete({
            where: {
                code: Number(code),
            },
        });
        res.json(result)
    } else {
        res.sendStatus(204)
    }
});

export default router;
