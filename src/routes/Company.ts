import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getCompanyPerId);
router.post("/", createCompany);
router.put("/", editCompanyPerId);
router.delete("/", deleteCompanyPerId);

async function getCompanyPerId(req, res) {
    const { id } = req.body;
    if (id) {
        const result = await prisma.company.findUnique({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        const result = await prisma.company.findMany();
        res.json(result);
    }
}

async function createCompany (req, res) {
    const { id, name } = req.body;
    if (name) {
        const result = await prisma.company.create({
            data: { 
                id: Number(id),
                name: String(name) 
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

async function editCompanyPerId (req, res) {
    const { id, name } = req.body;
    if (id && name) {
        const result = await prisma.company.update({
            where: { id: Number(id) },
            data: {
                name: String(name),
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

async function deleteCompanyPerId(req, res) {
    const { id } = req.body;
    if (id) {
        const result = await prisma.company.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

export default router;
