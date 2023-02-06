import prismaClient from "../../controllers/prismaClient";

export default async function getGroupPerId(req, res) {
    const id = req.params.id;
    try {
        const group = await prismaClient.groups.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.json(group)
    } catch(err) {
        res.json(err)
    }
}