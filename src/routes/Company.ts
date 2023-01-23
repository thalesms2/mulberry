import express, { response } from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllCompanys);
router.get("/:id", getCompanyPerId);
router.post("/", createCompany);
router.put("/", editCompanyPerId);
router.delete("/", deleteCompanyPerId);

async function getAllCompanys(req, res) {
    try {
        const result = await prisma.company.findMany();
        res.json(result);
    } catch(err) {
        res.json(err)
    }
}

async function getCompanyPerId(req, res) {
    const id = req.params.id;
    try {
        if (id) {
            const result = await prisma.company.findUnique({
                where: { id: Number(id) },
            });
            res.json(result);
        } else {
            res.sendStatus(204)
        }
    } catch(err) {
        response.json(err)
    }
    
}

async function createCompany (req, res) {
    const { id, name, userId } = req.body;
    try {
        if (id && name && userId) {
            const company = await prisma.company.create({
                data: { 
                    id: Number(id),
                    name: String(name) 
                },
            });
            const result = {
                company: company,
                log: await generateLog(
                    "CREATE",
                    `COMPANY ${company.id} - ${company.name} CREATED`,
                    Number(userId)
                )
            }
            res.json(result);
        } else {
            res.sendStatus(204);
        }
    } catch(err) {
        res.json(err)
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
    try {
        if (id) {
            const result = await prisma.company.delete({
                where: { id: Number(id) },
            });
            res.json(result);
        } else {
            res.sendStatus(204);
        }
    } catch(err) {
        res.json(err)
    }
}

export default router;
