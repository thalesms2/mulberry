import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllGroups);
router.get("/:id", getGroupPerId);
router.post("/", createNewGroup);
router.put("/", editGroupPerId);
router.delete("/", deleteGroupPerId);
router.delete("/all", deleteAllGroups);

async function getAllGroups(req, res) {
    try {
        const groups = await prisma.groups.findMany();
        res.json(groups);
    } catch(err) {
        res.json(err)
    }
}

async function getGroupPerId(req, res) {
    const id = req.params.id;
    try {
        const group = await prisma.groups.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.json(group)
    } catch(err) {
        res.json(err)
    }
}

async function createNewGroup (req, res) {
    const { id, description, userId } = req.body;
    try {
        if(id && description && userId) {
            const group = await prisma.groups.create({
                data: {
                    id: Number(id),
                    description: String(description),
                },
            });
            const result = {
                group: group,
                log: await generateLog(
                    "CREATE",
                    `GROUP ${group.id} - ${group.description} CREATED`,
                    Number(userId)
                )
            }
            res.json(result);
        } else {
            res.sendStatus(204)
        }
    } catch(err) {
        res.json(err)
    }
}

async function editGroupPerId(req, res) {
    const { id, description } = req.body;
    const result = await prisma.groups.update({
        where: {
            id: Number(id),
        },
        data: {
            description: String(description),
        },
    });
    res.json(result);
}

async function deleteGroupPerId(req, res) {
    const { id } = req.body;
    try {
        const result = await prisma.groups.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(result);
    } catch (err) {
        res.json(err)
    }
}

async function deleteAllGroups(req, res) {
    try {
        const result = await prisma.groups.deleteMany({});
        res.json(result);
    } catch(err) {
        res.json(err)
    }
}

export default router;
