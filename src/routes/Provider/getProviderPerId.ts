import prismaClient from "../../controllers/prismaClient";

export default async function getProviderPerId(req, res) {
    try {
        const { id } = req.params
        if(id) {
            const result = prismaClient.provider.findUnique({
                where:{ id: Number(id), }
            })
            res.json(result)
        }
    } catch(err) {
        res.json(err)
    }
}