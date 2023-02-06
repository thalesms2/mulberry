import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function deleteGroupPerId(req, res) {
    const { id } = req.body;
    try {
        const result = await prismaClient.groups.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(result);
    } catch (err) {
        res.json(err)
    }
}

// TODO Gerar log.