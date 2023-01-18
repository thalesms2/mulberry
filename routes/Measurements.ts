import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllMeasurements);
router.get("/:id", getMeasurementPerId);
router.post("/", createNewMeasurements);
router.put("/", editMeasurementsPerId);
router.delete("/", deleteMeasurementPerId);

async function getAllMeasurements (req, res) {
    const measurements = await prisma.measurements.findMany();
    res.json(measurements);
}

async function getMeasurementPerId (req, res) {
    const id = req.params.id;
    const measurements = await prisma.measurements.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(measurements)
}

async function createNewMeasurements (req, res) {
    const { description, initials, userId } = req.body;
    if(description && userId) {
        try {
            const measurements = await prisma.measurements.create({
                data: {
                    description: String(description),
                    initials: String(initials),
                },
            });
            const result = {
                measurements: measurements,
                log: await generateLog(
                    "CREATE",
                    `MEASUREMENTS ${measurements.id} - ${measurements.description} | ${measurements.initials} CREATED`,
                    Number(userId)
                )
            }
            res.json(result);
        } catch (err) {
            res.json(err)
        }
    }
}

async function editMeasurementsPerId(req, res) {
    const { id, description, initials } = req.body;
    const result = await prisma.measurements.update({
        where: {
            id: Number(id),
        },
        data: {
            description: String(description),
        },
    });
    res.json(result);
}

async function deleteMeasurementPerId (req, res) {
    const { id } = req.query;
    const result = await prisma.measurements.delete({
        where: {
            id: Number(id),
        },
    });
    res.json(result);
}

export default router;