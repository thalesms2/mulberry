import prismaClient from "../../controllers/prismaClient";

export default async function getAllGroups(req, res) {
    try {
        const groups = await prismaClient.groups.findMany();
        res.json(groups);
    } catch(err) {
        res.json(err)
    }
}