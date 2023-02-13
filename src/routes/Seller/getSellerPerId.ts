import prismaClient from "../../controllers/prismaClient";

export default async function getSellerPerId (req, res) {
    const id = req.params.id;
    try {
        if (id) {
            const result = await prismaClient.sellers.findUnique({
                where: { id: Number(id) },
            });
            res.json(result);
        } else {
            res.json(`Error: ID is missing`)
        }
    } catch(err) {
        res.json(`Error: ${err}`)
    }
    
}