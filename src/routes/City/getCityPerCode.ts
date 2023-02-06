import prismaClient from "../../controllers/prismaClient";

export default async function getCityPerCode (req, res) {
    const code = req.params.code;
    try {
        if (code) {
            const result = await prismaClient.citys.findUnique({
                where: { code: Number(code) },
            });
            res.json(result);
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.json(err)
    }
}