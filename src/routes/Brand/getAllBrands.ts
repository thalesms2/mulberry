import prismaClient from "../../controllers/prismaClient";

export default async function getAllBrands(req, res) {
    try {
        const brands = await prismaClient.brands.findMany();
        res.json(brands);
    } catch (err) {
        res.json(err);
    }
}