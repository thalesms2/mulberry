import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllSellers);
router.get("/:id", getSellerPerId);
router.post("/", createNewSeller);
router.put("/", editSellerPerId);
router.delete("/", deleteSellerPerId);

async function getAllSellers (req, res) {
    try {
        const result = await prisma.sellers.findMany();
        res.json(result);
    } catch(err) {
        res.json(`Error: ${err}`)
    }
}

async function getSellerPerId (req, res) {
    const id = req.params.id;
    try {
        if (id) {
            const result = await prisma.sellers.findUnique({
                where: { id: Number(id) },
            });
            res.json(result);
        } else {
            res.json(`Error: ID is missing`)
        }
    } catch(err) {
        res.json(`Error: ${err}`)
    }
    
}

async function  createNewSeller(req, res) {
    const { id, name, comission } = req.body;
    try {
        if (id && name && comission) {
            const result = await prisma.sellers.create({
                data: {
                    id: Number(id),
                    name: String(name),
                    comission: Number(comission),
                },
            });
            res.json(result);
        } else {
            res.sendStatus(204);
        }
    } catch(err) {
        res.json(`Error: ${err}`)
    }
    
}

async function editSellerPerId(req, res) {
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
}

async function deleteSellerPerId(req, res) {
    const { id } = req.body;
    if (id) {
        const result = await prisma.sellers.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

export default router;
