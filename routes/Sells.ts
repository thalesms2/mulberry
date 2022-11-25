import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { notaNumber } = req.body;
    if (notaNumber) {
        const result = await prisma.sells.findUnique({
            where: { notaNumber: Number(notaNumber) },
        });
        res.json(result);
    } else {
        const result = await prisma.sells.findMany();
        res.json(result);
    }
});

router.post("/", async (req, res) => {
    const {
        notaNumber,
        emission,
        sellerId,
        clientId,
        priceTable,
        quantity,
        discont,
        total,
    } = req.body;
    if (notaNumber && sellerId && clientId) {
        const result = await prisma.sells.create({
            data: {
                notaNumber: Number(notaNumber),
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
});

router.put("/", async (req, res) => {
    const {
        notaNumber,
        emission,
        sellerId,
        clientId,
        priceTable,
        quantity,
        discont,
        total,
    } = req.body;
    if (notaNumber) {
        const sell = await prisma.sells.findUnique({
            where: { notaNumber: Number(notaNumber) }
        })
        const result = await prisma.sells.update({
            where: { notaNumber: Number(notaNumber) },
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
});

router.delete("/", async (req, res) => {
    const { notaNumber } = req.body;
    if (notaNumber) {
        const result = await prisma.sells.delete({
            where: { notaNumber: Number(notaNumber) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

export default router;
