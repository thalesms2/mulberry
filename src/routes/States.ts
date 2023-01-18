import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllStates);
router.get("/:id", getStatePerCode);
router.post("/", createNewState);
router.put("/", editStatePerCode);
router.delete("/", deleteStatePerCode);

async function getAllStates(req, res) {
    const { code } = req.body;
    if (code) {
        const result = await prisma.states.findUnique({
            where: { code: String(code) },
        });
        res.json(result);
    } else {
        const result = await prisma.states.findMany();
        res.json(result);
    }
}

async function getStatePerCode(req, res) {
    // TODO getStatePerCode
}

async function createNewState(req, res) {
    const { code, name } = req.body;
    if (code && name) {
        const result = await prisma.states.create({
            data: {
                code: String(code),
                name: String(name),
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

async function editStatePerCode(req, res) {
    const { code, name } = req.body;
    if (code && name) {
        const result = await prisma.states.update({
            where: { code: String(code) },
            data: { name: String(name) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

async function deleteStatePerCode(req, res) {
    const { code } = req.body;
    if (code) {
        const result = await prisma.states.delete({
            where: { code: String(code) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

export default router;
