import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function createCompany (req, res) {
    const { id, name, userId } = req.body;
    try {
        if (id && name && userId) {
            const company = await prismaClient.company.create({
                data: { 
                    id: Number(id),
                    name: String(name) 
                },
            });
            const result = {
                company: company,
                log: await generateLog(
                    "CREATE",
                    `COMPANY ${company.id} - ${company.name} CREATED`,
                    Number(userId)
                )
            }
            res.json(result);
        } else {
            res.sendStatus(204);
        }
    } catch(err) {
        res.json(err)
    }
}