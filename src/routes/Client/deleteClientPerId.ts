import prismaClient from "../../controllers/prismaClient";

export default async function deleteClientPerId(req, res) {
    const { id } = req.body;
    try {
        if (id) {
            const result = await prismaClient.clients.delete({
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
