import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function editCityPerCode(req, res) {
    const { code, name, codeState, userId } = req.body;
    try {
        if (code && name && codeState && userId) {
            const oldCity = await prismaClient.citys.findUnique({
                where: { code: Number(code) }
            })
            const city = await prismaClient.citys.update({
                where: {
                    code: Number(code),
                },
                data: {
                    name: name,
                    statesCode: codeState,
                },
            });
            const result = {
                city: city,
                log: await generateLog(
                    "EDIT",
                    `City ${oldCity.code} EDITED - NAME ${oldCity.name} STATE ${oldCity.statesCode} NEW NAME ${city.name} NEW STATE ${city.statesCode}`,
                    Number(userId)
                )
            }
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err)
    }
}