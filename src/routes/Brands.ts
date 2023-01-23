import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllBrands);
router.get("/:id", getBrandPerId);
router.post("/", createNewBrand);
router.put("/", editBrandPerId);
router.delete("/", deleteBrandPerId);
router.delete("/all", deleteAllBrands);

async function getAllBrands(req, res) {
    try {
        const brands = await prisma.brands.findMany();
        res.json(brands);
    } catch (err) {
        res.json(err);
    }
}

async function getBrandPerId(req, res) {
    const id = req.params.id;
    try {
        const brand = await prisma.brands.findUnique({
            where: { id: Number(id) },
        });
        res.json(brand);
    } catch (err) {
        res.json(err);
    }
}

async function createNewBrand(req, res) {
    const { id, description, userId } = req.body;
    try {
        if (id && description && userId) {
            const brand = await prisma.brands.create({
                data: { id: Number(id), description: String(description) },
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
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err);
    }
}

async function editBrandPerId(req, res) {
    const { id, description, userId } = req.body;
    try {
        if (id && description && userId) {
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
                    `BRAND ${brand.id} EDITED - DESCRIPTION ${oldBrand.description} NEW DESCRIPTION ${brand.description}`,
                    Number(userId)
                ),
            };
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err);
    }
}

async function deleteBrandPerId(req, res) {
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
        res.json(err);
    }
}

async function deleteAllBrands(req, res) {
    try {
        const result = await prisma.brands.deleteMany({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

export default router;
