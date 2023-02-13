import prismaClient from "../../controllers/prismaClient";

export default async function getAllSellers (req, res) {
    try {
        const result = await prismaClient.sellers.findMany();
        res.json(result);
    } catch(err) {
        res.json(`Error: ${err}`)
    }
}