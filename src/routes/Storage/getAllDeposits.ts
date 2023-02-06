import prismaClient from "../../controllers/prismaClient";

export default async function getAllDeposits(req, res) {
    try {
        const deposit = await prismaClient.deposit.findMany();
        res.json(deposit);
    } catch (err) {
        res.json(err);
    }
}