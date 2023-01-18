import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllTasks);
router.get("/:id", getTaskPerId);
router.post("/", createNewTask);
router.put("/", editTaskPerId);
router.delete("/", deleteBrandPerId);
router.delete("/all", deleteAllBrands);

async function getAllTasks(req, res) {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (err) {
        res.json(`Error: ${err}`);
    }
}

async function getTaskPerId(req, res) {
    const id = req.params.id;
    try {
        const task = await prisma.task.findUnique({
            where: { id: Number(id) },
        });
        res.json(task);
    } catch (err) {
        res.json(err);
    }
}

async function createNewTask(req, res) {
    const { id, description, status, userId, currentUserId } = req.body;
    try {
        if (description && userId) {
            const task = await prisma.task.create({
                data: { 
                    id: id,
                    description: String(description),
                    status: status,
                    userId: userId,
                },
            });
            const result = {
                task: task,
                log: await generateLog(
                    "CREATE",
                    `TASK ${task.id} - ${task.description} CREATED`,
                    Number(currentUserId)
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

async function editTaskPerId(req, res) {
    const { id, description, userId } = req.body;
    // TODO editTaskPerId
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
    // TODO deleteTaskPerId
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

async function deleteAllTasksPerUser(req, res) {
    // TODO deleteAllTasksPerUser
}

async function deleteAllBrands(req, res) {
    // TODO deleteAllTasks
    try {
        const result = await prisma.brands.deleteMany({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

export default router;
