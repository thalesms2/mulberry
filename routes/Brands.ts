import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const brands = await prisma.brands.findMany();
    res.json(brands);
});

router.get("/:id", async(req, res) => {
    const id = req.params.id
    if(id) {
        const brand = await prisma.brands.findUnique({
            where: { id: Number(id) },
        })
        res.json(brand)
    }
})

router.post("/", async (req, res) => {
    const { description, userId } = req.body;
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
        res.sendStatus(204);
    }
});

router.put("/", async (req, res) => {
    const { id, description } = req.body;
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
        res.sendStatus(404);
    }
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
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
        res.sendStatus(404);
    }
});

router.delete("/all", async (req, res) => {
    const result = await prisma.brands.deleteMany({});
    res.json(result);
});

export default router;
