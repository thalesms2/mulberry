import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function deleteBrandPerId(req, res) {
    const { id } = req.body;
    try {
        if (id) {
            const brand = await prismaClient.brands.delete({
                where: { id: Number(id) },
            });
            const result = {
                brand: brand,
                log: await generateLog(
                    "DELETE",
                    `BRAND ${brand.id} - ${brand.description} DELETED`,
                    Number(req.cookies.userId)
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