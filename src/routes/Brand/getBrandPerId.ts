import prismaClient from "../../controllers/prismaClient";

export default async function getBrandPerId(req, res) {
    const id = req.params.id;
    try {
        const brand = await prismaClient.brands.findUnique({
            where: { id: Number(id) },
        });
        res.json(brand);
    } catch (err) {
        res.json(err);
    }
}