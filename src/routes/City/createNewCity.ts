import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function createNewCity(req, res) {
    const { code, name, codeState, userId } = req.body;
    try {
        if (code && name && codeState && userId) {
            const city = await prismaClient.citys.create({
                data: {
                    code: Number(code),
                    name: String(name),
                    statesCode: String(codeState),
                },
            });
            
            const result = {
                city: city,
                log: await generateLog(
                    "CREATE",
                    `CITY ${city.code} - ${city.name} - ${city.statesCode} CREATED`,
                    Number(userId)
                ),
            }
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err)
    }
}