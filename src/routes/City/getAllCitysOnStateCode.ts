import prismaClient from "../../controllers/prismaClient";

export default async function getAllCitysOnStateCode(req, res) {
    const code = req.params.code;
    try {
        if (code) {
            const result = await prismaClient.citys.findMany({
                where: { statesCode: String(code) },
            });
            res.json(result);
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.json(err)
    }
}