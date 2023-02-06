import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function createNewGroup (req, res) {
    const { id, description, userId } = req.body;
    try {
        if(id && description && userId) {
            const group = await prismaClient.groups.create({
                data: {
                    id: Number(id),
                    description: String(description),
                },
            });
            const result = {
                group: group,
                log: await generateLog(
                    "CREATE",
                    `GROUP ${group.id} - ${group.description} CREATED`,
                    Number(userId)
                )
            }
            res.json(result);
        } else {
            res.sendStatus(204)
        }
    } catch(err) {
        res.json(err)
    }
}