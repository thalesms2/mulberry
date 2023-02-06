import prismaClient from "../../controllers/prismaClient";

export default async function getAllCompanys(req, res) {
    try {
        const result = await prismaClient.company.findMany();
        res.json(result);
    } catch(err) {
        res.json(err)
    }
}