import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const products = await prisma.products.findMany();
    res.json(products);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await prisma.products.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(product);
});

router.post("/", async (req, res) => {
    const { description, measurement, brandId, groupId, cost, profit, price } =
        req.body;
    const result = await prisma.products.create({
        data: {
            description: String(description),
            measurement: String(measurement),
            cost: Number(cost),
            profit: Number(profit),
            price: Number(price),
            brand: {
                connect: [{ id : brandId }]
            },
            group: {
                connect: [{ id: groupId }]
            }
        },
    });
    res.json(result);
});

router.put("/", async (req, res) => {
    const {
        id,
        description,
        measurement,
        brandId,
        groupId,
        cost,
        profit,
        price,
    } = req.body;
    const result = await prisma.products.update({
        where: {
            id: Number(id),
        },
        data: {
            description: String(description),
            measurement: String(measurement),
            cost: Number(cost),
            profit: Number(profit),
            price: Number(price),
            brand: {
                connect: [{ id: brandId }]
            },
            group: {
                connect: [{ id: groupId }]
            }
        },
    });
    res.json(result);
});

router.delete("/", async (req, res) => {
    const { id } = req.query;
    const result = await prisma.products.delete({
        where: {
            id: Number(id),
        },
    });
    res.json(result);
});

export default router;
