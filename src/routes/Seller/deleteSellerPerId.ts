import prismaClient from "../../controllers/prismaClient";

export default async function deleteSellerPerId(req, res) {
    const { id } = req.body;
    if (id) {
        const result = await prismaClient.sellers.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}