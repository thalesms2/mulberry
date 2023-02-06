import prismaClient from "../../controllers/prismaClient";

export default async function getAllCitys(req, res) {
    try {
        const result = await prismaClient.citys.findMany({});
        res.json(result);
    } catch (err) {
        res.json(err)
    }
}