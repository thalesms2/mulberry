import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllLogs);
router.get("/:id", getLogPerId);
router.post("/", createNewLog);
router.put("/", editLogPerId);
router.delete("/", deleteLogPerId);
router.delete("/all", deleteAllLogs);

async function getAllLogs(req, res) {
    const result = await prisma.logs.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })
    res.json(result);
}

async function getLogPerId(req, res) {
    //TODO getLogPerId
}

async function createNewLog (req, res) {
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
}

async function editLogPerId(req, res) {
    // TODO editLogPerId
    res.sendStatus(204);
}

async function deleteLogPerId(req, res) {
    // TODO deleteLogPerId
    res.sendStatus(204);
}

async function deleteAllLogs(req, res) {
    const result = await prisma.logs.deleteMany({});
    res.json(result);
}

export default router;
