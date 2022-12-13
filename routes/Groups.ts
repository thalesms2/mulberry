import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

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
    const { description, userId } = req.body;
    if(description && userId) {
        const group = await prisma.groups.create({
            data: {
                description: String(description),
            },
        });
        const result = {
            group: group,
            log: await generateLog(
                "CREATE",
                `GROUP ${group.id} - ${group.description} CREATED`,
                Number(userId)
            )
        }
        res.json(result);
    } else {
        res.sendStatus(204)
    }
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

router.delete("/all", async (req, res) => {
    const result = await prisma.groups.deleteMany({});
    res.json(result);
});

export default router;
