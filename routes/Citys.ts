import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", getAllCitys);
router.get("/:code", getCityPerCode);
router.post("/", createNewCity);
router.put("/", editCityPerCode);
router.delete("/", deleteCityPerId);
router.delete("/all", deleteAllCitys);

async function getAllCitys(req, res) {
    try {
        const result = await prisma.citys.findMany({});
        res.json(result);
    } catch (err) {
        res.json(err)
    }
}

async function getCityPerCode (req, res) {
    const code = req.params.code;
    try {
        if (code) {
            const result = await prisma.citys.findUnique({
                where: { code: Number(code) },
            });
            res.json(result);
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.json(err)
    }
}

async function createNewCity(req, res) {
    const { name, codeState, userId } = req.body;
    try {
        if (name && codeState && userId) {
            const city = await prisma.citys.create({
                data: {
                    name: String(name),
                    state: {
                        connect: { code: String(codeState) },
                    },
                },
            });
            const result = {
                city: city,
                log: await generateLog(
                    'CREATE',
                    `CITY ${city.code} - ${city.name}-${city.statesCode} CREATED`,
                    Number(userId)
                )
            }
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err)
    }
}

async function editCityPerCode(req, res) {
    const { code, name, codeState, userId } = req.body;
    try {
        if (code && name && codeState && userId) {
            const oldCity = await prisma.citys.findUnique({
                where: { code: Number(code) }
            })
            const city = await prisma.citys.update({
                where: {
                    code: Number(code),
                },
                data: {
                    name: name,
                    statesCode: codeState,
                },
            });
            const result = {
                city: city,
                log: await generateLog(
                    "EDIT",
                    `City ${oldCity.code} EDITED - NAME ${oldCity.name} STATE ${oldCity.statesCode} NEW NAME ${city.name} NEW STATE ${city.statesCode}`,
                    Number(userId)
                )
            }
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err)
    }
}

async function deleteCityPerId(req, res) {
    const { code } = req.body;
    try {
        if (code) {
            const result = await prisma.citys.delete({
                where: {
                    code: Number(code),
                },
            });
            res.json(result)
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.json(err)
    }
}
async function deleteAllCitys(req, res) {
    try {
        const result = await prisma.citys.deleteMany({});
        res.json(result)
    } catch (err) {
        res.json(err)
    }
}

export default router;
