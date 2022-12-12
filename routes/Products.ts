import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

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
        include: {
            brand: {
                select: {
                    id: true,
                    description: true,
                }
            },
            group: {
                select: {
                    id: true,
                    description: true
                }
            },
        }
    });
    res.json(product);
});

router.post("/", async (req, res) => {
    const { description, measurement, brandId, groupId, cost, profit, price } =
        req.body;
    const product = await prisma.products.create({
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
    const result = {
        product: product,
        log: await generateLog(
            "CREATE",
            `PRODUCT ${product.id} - ${product.description} | Measurement: ${product.measurement} | Cost: ${product.cost} | Profit: ${product.profit} | Price: ${product.price}`,
            Number(req.cookies.userId)
        ),
    }
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
    const oldProduct = await prisma.products.findUnique({
        where: {
            id: Number(id),
        },
    })
    const product = await prisma.products.update({
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
    const result = {
        product: product,
        log: await generateLog(
            "EDIT",
            `PRODUCT ${product.id} EDITED Description ${oldProduct.description} | Measurement: ${oldProduct.measurement} | Cost: ${oldProduct.cost} | Profit: ${oldProduct.profit} | Price: ${oldProduct.price} || New Description ${product.description} | New Measurement: ${product.measurement} | New Cost: ${product.cost} | New Profit: ${product.profit} | New Price: ${product.price}`,
            Number(req.cookies.userId)
        ),
    }
    res.json(result);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await prisma.products.delete({
        where: {
            id: Number(id),
        },
    });
    const result = {
        product: product,
        log: await generateLog(
            "DELETE",
            `PRODUCT ${product.id} - ${product.description} DELETED`,
            Number(req.cookies.userId)
        )
    }
    res.json(result);
});

export default router;
