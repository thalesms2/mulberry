import prismaClient from "../../controllers/prismaClient";

export default async function deleteAllClients (req, res) {
    try {
        const result = await prismaClient.clients.deleteMany({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}