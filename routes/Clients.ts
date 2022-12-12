import express from "express";
import { PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const result = await prisma.clients.findMany();
    res.json(result);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (id) {
        const result = await prisma.clients.findUnique({
            where: { id: Number(id) },
        });
        res.json(result);
    }
    res.sendStatus(404)
});

router.post("/", async (req, res) => {
    const { name, cpf, cityId, adress, neighborhood, cep, birth, priceTable } =
        req.body;
    if (
        name &&
        cpf &&
        cityId &&
        adress &&
        neighborhood &&
        cep &&
        birth &&
        priceTable
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
                Number(req.cookies.userId)
            )
        }
        res.json(result);
    } else {
        res.sendStatus(204);
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
    } = req.body;
    if (id) {
        const client = await prisma.clients.findUnique({
            where: { id: Number(id) },
        });
        const result = await prisma.clients.update({
            where: { id: Number(id) },
            data: {
                name: name ? String(name) : client.name, 
                cpf: cpf ? String(cpf) : client.cpf,
                cityId: cityId ? Number(cityId) : client.cityId,
                adress: adress ? String(adress) : client.adress,
                neighborhood: neighborhood ? String(neighborhood) : client.neighborhood,
                cep: cep ? String(cep) : client.cep,
                birth: birth ? birth : client.birth,
                priceTable: priceTable ? Number(priceTable) : client.priceTable,
            },
        });
        res.json(result)
    } else {
        res.sendStatus(204);
    }
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const result = await prisma.clients.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

export default router;
