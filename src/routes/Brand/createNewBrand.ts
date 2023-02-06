import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function createNewBrand(req, res) {
    const { id, description, userId } = req.body;
    try {
        if (id && description && userId) {
            const brand = await prismaClient.brands.create({
                data: { id: Number(id), description: String(description) },
            });
            const result = {
                brand: brand,
                log: await generateLog(
                    "CREATE",
                    `BRAND ${brand.id} - ${brand.description} CREATED`,
                    Number(userId)
                ),
            };
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.json(err);
    }
}