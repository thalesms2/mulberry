import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function  createNewSeller(req, res) {
    const { id, name, comission, userId } = req.body;
    try {
        if (id && name && comission && userId) {
            const seller = await prismaClient.sellers.create({
                data: {
                    id: Number(id),
                    name: String(name),
                    comission: Number(comission),
                },
            });
            const result = {
                seller: seller,
                log: await generateLog(
                    "CREATE",
                    `PROVIDER ${seller.id} - ${seller.name} CREATED`,
                    Number(userId)
                ),
            }
            res.json(result);
        } else {
            res.sendStatus(204);
        }
    } catch(err) {
        res.json(`Error: ${err}`)
    }
    
}