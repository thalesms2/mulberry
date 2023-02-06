import prismaClient from "../../controllers/prismaClient";

export default async function deleteUserPerId(req, res) {
    const id = req.params.id
    if (id) {
        const result = await prismaClient.users.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}