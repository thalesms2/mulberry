import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const measurements = await prisma.measurements.findMany();
    res.json(measurements);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const measurements = await prisma.measurements.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(measurements)
});

router.post("/", async (req, res) => {
    const {description, initials, userId } = req.body;
    if(description && userId) {
        const measurements = await prisma.measurements.create({
            data: {
                description: String(description),
                initials: initials
            },
        });
        const result = {
            measurements: measurements,
            log: await generateLog(
                "CREATE",
                `MEASUREMENTS ${measurements.id} - ${measurements.description} | ${measurements.initials} CREATED`,
                Number(userId)
            )
        }
        res.json(result);
    } else {
        res.sendStatus(204)
    }
});

router.put("/", async (req, res) => {
    const { id, description, initials } = req.body;
    const result = await prisma.measurements.update({
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
    const result = await prisma.measurements.delete({
        where: {
            id: Number(id),
        },
    });
    res.json(result);
});

export default router;