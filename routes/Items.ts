import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { id, notaNumber } = req.body;
    if (id) {
        const result = await prisma.items.findUnique({
            where: { id: Number(id) },
        });
        res.json(result);
    } else if (notaNumber) {
        const result = await prisma.items.findMany({
            where: { notaNumber: Number(notaNumber) },
        });
        res.json(result);
    } else {
        const result = await prisma.items.findMany();
        res.json(result);
    }
});

router.post("/", async (req, res) => {
    const { notaNumber, productId, unitaryPrice, discount, total } = req.body;
    if (notaNumber && productId && unitaryPrice && discount && total) {
        const result = await prisma.items.create({
            data: {
                notaNumber: Number(notaNumber),
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
});
router.put("/", async (req, res) => {
    const { id, notaNumber, productId, unitaryPrice, discount, total } = req.body;
    if (id) {
        const item = await prisma.items.findUnique({
            where: { id: Number(id) }
        })
        const result = await prisma.items.update({
            where: { id: Number(id) },
            data: {
                notaNumber: notaNumber ? Number(notaNumber) : item.notaNumber,
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
});
router.delete("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const result = await prisma.items.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

export default router;
