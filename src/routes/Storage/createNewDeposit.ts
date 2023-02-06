import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function createNewDeposit(req, res) {
    const { id, name, description, userId } = req.body;
    try {
        if (id && name && userId) {
            const deposit = await prismaClient.deposit.create({
                data: { 
                    id: Number(id),
                    name: String(name),
                    description: String(description) 
                },
            });
            const result = {
                deposit: deposit,
                log: await generateLog(
                    "CREATE",
                    `DEPOSIT ${deposit.id} - ${deposit.name} CREATED`,
                    Number(userId)
                ),
            };
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err);
    }
}