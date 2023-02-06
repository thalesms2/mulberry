import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function deleteCompanyPerId(req, res) {
    const { id } = req.body;
    try {
        if (id) {
            const result = await prismaClient.company.delete({
                where: { id: Number(id) },
            });
            res.json(result);
        } else {
            res.sendStatus(204);
        }
    } catch(err) {
        res.json(err)
    }
}