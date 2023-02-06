import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function editBrandPerId(req, res) {
    const { id, description, userId } = req.body;
    try {
        if (id && description && userId) {
            const oldBrand = await prismaClient.brands.findUnique({
                where: { id: Number(id) },
            });
            const brand = await prismaClient.brands.update({
                where: { id: Number(id) },
                data: { description: String(description) },
            });
            const result = {
                brand: brand,
                log: await generateLog(
                    "EDIT",
                    `BRAND ${brand.id} EDITED - DESCRIPTION ${oldBrand.description} NEW DESCRIPTION ${brand.description}`,
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