import prismaClient from "../../controllers/prismaClient";

export default async function deleteCityPerId(req, res) {
    const { code } = req.body;
    try {
        if (code) {
            const result = await prismaClient.citys.delete({
                where: {
                    code: Number(code),
                },
            });
            res.json(result)
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.json(err)
    }
}