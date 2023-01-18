import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllSells)
router.get("/:id", getSellPerId)
router.post("/", createNewSell);
router.put("/", editSellPerId);
router.delete("/", deleteSellPerId);

async function getAllSells(req, res) {
    const result = await prisma.sells.findMany();
    res.json(result);
}

async function getSellPerId(req, res) {
    // TODO getSellPerId
}

async function createNewSell(req, res) {
    const {
        noteNumber,
        emission,
        sellerId,
        clientId,
        priceTable,
        quantity,
        discont,
        total,
    } = req.body;
    if (noteNumber && sellerId && clientId) {
        const result = await prisma.sells.create({
            data: {
                noteNumber: Number(noteNumber),
                emission: emission ? emission : "Ainda não emitida",
                sellerId: Number(sellerId),
                clientId: Number(clientId),
                priceTable: priceTable ? Number(priceTable) : 0,
                quantity: quantity ? Number(quantity) : 0,
                discont: discont ? Number(discont) : 0,
                total: total ? Number(total) : 0,
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

async function editSellPerId(req, res) {
    const {
        noteNumber,
        emission,
        sellerId,
        clientId,
        priceTable,
        quantity,
        discont,
        total,
    } = req.body;
    if (noteNumber) {
        const sell = await prisma.sells.findUnique({
            where: { noteNumber: Number(noteNumber) }
        })
        const result = await prisma.sells.update({
            where: { noteNumber: Number(noteNumber) },
            data: {
                emission: emission ? emission : sell.emission,
                sellerId: sellerId ? Number(sellerId) : sell.sellerId,
                clientId: clientId ? Number(clientId): sell.clientId,
                priceTable: priceTable ? Number(priceTable) : sell.priceTable,
                quantity: quantity ? Number(quantity) : sell.quantity,
                discont: discont ? Number(discont) : sell.discont,
                total: total ? Number(total) : sell.total,
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

async function deleteSellPerId(req, res) {
    const { noteNumber } = req.body;
    if (noteNumber) {
        const result = await prisma.sells.delete({
            where: { noteNumber: Number(noteNumber) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}

export default router;
