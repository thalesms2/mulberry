import prismaClient from "../../controllers/prismaClient";

export default async function getAllProviders(req, res) {
    try {
        const result = await prismaClient.provider.findMany({})
        res.json(result)
    } catch(err) {
        res.json(err)
    }
}