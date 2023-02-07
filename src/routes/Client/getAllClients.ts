import prismaClient from "../../controllers/prismaClient";

export default async function getAllClients(req, res) {
    try {
        const result = await prismaClient.clients.findMany();
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}