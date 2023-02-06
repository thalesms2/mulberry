import prismaClient from "../../controllers/prismaClient";

export default async function getAllUsers(req, res) {
    try {
        const users = await prismaClient.users.findMany({
            orderBy: {
                id: 'asc'
            }
        })
        res.json(users)
    } catch (err) {
        res.json(`Error: ${err}`)
    }
}