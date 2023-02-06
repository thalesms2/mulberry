import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function editCompanyPerId (req, res) {
    const { id, name } = req.body;
    if (id && name) {
        const result = await prismaClient.company.update({
            where: { id: Number(id) },
            data: {
                name: String(name),
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}
// TODO gerar log.