import prismaClient from "../../controllers/prismaClient";

export default async function getAllCitysOnStateCode(req, res) {
    const codeState = req.params.code;
    try {
        if (codeState) {
            const result = await prismaClient.citys.findMany({
                where: { statesCode: String(codeState) },
            });
            res.json(result);
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.json(err)
    }
}