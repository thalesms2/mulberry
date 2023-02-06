import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function editGroupPerId(req, res) {
    const { id, description } = req.body;
    const result = await prismaClient.groups.update({
        where: {
            id: Number(id),
        },
        data: {
            description: String(description),
        },
    });
    res.json(result);
}

// TODO gerar log.