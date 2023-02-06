import prismaClient from "../../controllers/prismaClient";

export default async function getCompanyPerId(req, res) {
    const id = req.params.id;
    try {
        if (id) {
            const result = await prismaClient.company.findUnique({
                where: { id: Number(id) },
            });
            res.json(result);
        } else {
            res.sendStatus(204)
        }
    } catch(err) {
        res.json(err)
    }
    
}