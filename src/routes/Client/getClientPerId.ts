import prismaClient from "../../controllers/prismaClient";

export default async function getClientPerId(req, res) {
    const id = req.params.id;
    try {
        if (id) {
            const result = await prismaClient.clients.findUnique({
                where: { id: Number(id) },
            });
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err);
    }
}