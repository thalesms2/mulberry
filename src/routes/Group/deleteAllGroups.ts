import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function deleteAllGroups(req, res) {
    try {
        const result = await prismaClient.groups.deleteMany({});
        res.json(result);
    } catch(err) {
        res.json(err)
    }
}

// TODO Gerar log.