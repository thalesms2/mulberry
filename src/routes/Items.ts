import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getItemPerNoteId);
router.post("/", createNewItem);
router.put("/", editItemPerId);
router.delete("/", deleteItemPerId);

async function getItemPerNoteId(req, res) {
    const { id, noteNumber } = req.body;
    if (id) {
        const result = await prisma.items.findUnique({
            where: { id: Number(id) },
        });
        res.json(result);
    } else if (noteNumber) {
        const result = await prisma.items.findMany({
            where: { noteNumber: Number(noteNumber) },
        });
        res.json(result);
    } else {
        const result = await prisma.items.findMany();
        res.json(result);
    }
}

async function createNewItem(req, res) {
    const { noteNumber, productId, unitaryPrice, discount, total } = req.body;
    if (noteNumber && productId && unitaryPrice && discount && total) {
        const result = await prisma.items.create({
            data: {
                noteNumber: Number(noteNumber),
                productId: Number(productId),
                unitaryPrice: Number(unitaryPrice),
                discount: Number(discount),
                total: Number(total),
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

async function editItemPerId(req, res) {
    const { id, noteNumber, productId, unitaryPrice, discount, total } = req.body;
    if (id) {
        const item = await prisma.items.findUnique({
            where: { id: Number(id) }
        })
        const result = await prisma.items.update({
            where: { id: Number(id) },
            data: {
                noteNumber: noteNumber ? Number(noteNumber) : item.noteNumber,
                productId: productId ? Number(productId) : item.productId,
                unitaryPrice: unitaryPrice ? Number(unitaryPrice) : item.unitaryPrice,
                discount: discount ? Number(discount) : item.discount,
                total: total ? Number(total) : item.total,
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

async function deleteItemPerId(req, res) {
    const { id } = req.body;
    if (id) {
        const result = await prisma.items.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

export default router;
