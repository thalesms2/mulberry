import prismaClient from "../../controllers/prismaClient";

export default async function editSellerPerId(req, res) {
    const { id, name, comission } = req.body;
    if (id) {
        const seller = await prismaClient.sellers.findUnique({
            where: { id: Number(id)}
        })
        const result = await prismaClient.sellers.update({
            where: { id: Number(id) },
            data: {
                name: name ? String(name) : seller.name,
                comission: comission ? String(comission) : seller.comission,
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}