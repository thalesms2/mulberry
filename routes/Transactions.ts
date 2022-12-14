import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const result = await prisma.transactions.findUnique({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        const result = await prisma.transactions.findMany();
        res.json(result);
    }
});

router.post("/", async (req, res) => {
    const { type, transaction, productId, quantity, cost, price, userId } =
        req.body;
    if (
        type &&
        transaction &&
        productId &&
        quantity &&
        cost &&
        price &&
        userId
    ) {
        const result = await prisma.transactions.create({
            data: {
                type: String(type),
                transaction: String(transaction),
                productId: Number(productId),
                quantity: Number(quantity),
                cost: Number(cost),
                price: Number(price),
                userId: Number(userId),
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

router.put("/", async (req, res) => {
    const { id, type, transaction, productId, quantity, cost, price, userId } =
        req.body;
    if (id) {
        const consult = await prisma.transactions.findUnique({
            where: { id: Number(id) },
        });
        const result = await prisma.transactions.update({
            where: { id: Number(id) },
            data: {
                type: type ? String(type) : consult.type,
                transaction: transaction ? String(transaction) : consult.transaction,
                productId: productId ? Number(productId) : consult.productId,
                quantity: quantity ? Number(quantity) : consult.quantity,
                cost: cost ? Number(cost) : consult.cost,
                price: price ? Number(price) : consult.price,
                userId: userId ? Number(userId) : consult.userId,
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
        const result = await prisma.transactions.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

export default router;
