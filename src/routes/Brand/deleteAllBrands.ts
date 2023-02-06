import prismaClient from "../../controllers/prismaClient";
export default async function deleteAllBrands(req, res) {
    try {
        const result = await prismaClient.brands.deleteMany({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}