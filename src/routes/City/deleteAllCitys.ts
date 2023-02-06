import prismaClient from "../../controllers/prismaClient";

export default async function deleteAllCitys(req, res) {
    try {
        const result = await prismaClient.citys.deleteMany({});
        res.json(result)
    } catch (err) {
        res.json(err)
    }
}