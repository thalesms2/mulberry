import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const result = await prisma.clients.findMany();
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const result = await prisma.clients.findUnique({
                where: { id: Number(id) },
            });
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const { name, cpf, cityId, adress, neighborhood, cep, birth, priceTable, userId } =
        req.body;
    try {
        if (
            name &&
            cpf &&
            cityId &&
            adress &&
            neighborhood &&
            cep &&
            birth &&
            priceTable &&
            userId
        ) {
            const client = await prisma.clients.create({
                data: {
                    name: String(name),
                    cpf: String(cpf),
                    cityId: Number(cityId),
                    adress: String(adress),
                    neighborhood: String(neighborhood),
                    cep: String(cep),
                    birth: birth,
                    priceTable: Number(priceTable),
                },
            });
            const result = {
                client: client,
                log: await generateLog(
                    "CREATE",
                    `CLIENT ${client.id} - ${client.name} CREATED`,
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
});

router.put("/", async (req, res) => {
    const {
        id,
        name,
        cpf,
        cityId,
        adress,
        neighborhood,
        cep,
        birth,
        priceTable,
        userId
    } = req.body;
    try {
        if  (
            id &&
            name &&
            cpf &&
            cityId &&
            adress &&
            neighborhood &&
            cep &&
            birth &&
            priceTable &&
            userId
        ) {
            const oldClient = await prisma.clients.findUnique({
                where: { id: Number(id) },
            });
            const client = await prisma.clients.update({
                where: { id: Number(id) },
                data: {
                    name: name,
                    cpf: cpf,
                    cityId: cityId,
                    adress: adress,
                    neighborhood: neighborhood,
                    cep: cep,
                    birth: birth,
                    priceTable: priceTable,
                },
            });
            const result = {
                client: client,
                log: await generateLog(
                    "EDIT",
                    `CLIENT ${client.id} - NAME ${oldClient.name} CPF ${oldClient.cpf} CITY ${oldClient.cityId} ADRESS ${oldClient.name} NEIGHBORHOOD ${oldClient.neighborhood} CEP ${oldClient.cep} BIRTH ${oldClient.birth} PRICE TABLE ${oldClient.priceTable} NEW NAME ${client.name} NEW CPF ${client.cpf} NEW CITY ${client.cityId} NEW ADRESS ${client.name} NEW NEIGHBORHOOD ${client.neighborhood} NEW CEP ${client.cep} NEW BIRTH ${client.birth} NEW PRICE TABLE ${client.priceTable}`,
                    Number(userId)
                )
            }
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err);
    }
    
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
    try {
        if (id) {
            const result = await prisma.clients.delete({
                where: { id: Number(id) },
            });
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err);
    }
});

router.delete("/all", async (req, res) => {
    try {
        const result = await prisma.clients.deleteMany({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

export default router;
