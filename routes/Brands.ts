import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const brands = await prisma.brands.findMany();
        res.json(brands);
    } catch (err) {
        res.json(err)
    }
});

router.get("/:id", async(req, res) => {
    const id = req.params.id
    try{
        const brand = await prisma.brands.findUnique({
            where: { id: Number(id) },
        })
        res.json(brand)
    } catch (err) {
        res.json(err)
    }
})

router.post("/", async (req, res) => {
    const { description, userId } = req.body;
    try {
        if (description && userId) {
            const brand = await prisma.brands.create({
                data: { description: String(description) },
            });
            const result = {
                brand: brand,
                log: await generateLog(
                    "CREATE",
                    `BRAND ${brand.id} - ${brand.description} CREATED`,
                    Number(userId)
                ),
            };
            res.json(result);
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.json(err)
    }
});

router.put("/", async (req, res) => {
    const { id, description } = req.body;
    try {
        if (id && description) {
            const oldBrand = await prisma.brands.findUnique({
                where: { id: Number(id) },
            });
            const brand = await prisma.brands.update({
                where: { id: Number(id) },
                data: { description: String(description) },
            });
            const result = {
                brand: brand,
                log: await generateLog(
                    "EDIT",
                    `BRAND ${brand.id} EDITED - DESCRIPTION ${oldBrand.description} NEW DESCRIPTION ${brand.description} `,
                    Number(req.cookies.userId)
                ),
            };
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err)
    }
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
    try {
        if (id) {
            const brand = await prisma.brands.delete({
                where: { id: Number(id) },
            });
            const result = {
                brand: brand,
                log: await generateLog(
                    "DELETE",
                    `BRAND ${brand.id} - ${brand.description} DELETED`,
                    Number(req.cookies.userId)
                ),
            };
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err)
    }
});

router.delete("/all", async (req, res) => {
    try {
        const result = await prisma.brands.deleteMany({});
        res.json(result);
    } catch (err) {
        res.json(err)
    }
});

export default router;
