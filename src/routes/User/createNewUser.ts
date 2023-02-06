import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function createNewUser(req, res) {
    const { id, name, password, type } = req.body;
    if (name) {
        const user = await prismaClient.users.create({
            data: {
                id: Number(id),
                name: String(name),
                password: password ? String(password) : "0000",
                type: String(type),
            },
        });
        const result = {
            user: user,
            log: await generateLog(
                "CREATE",
                `USER ${user.id} - ${user.name} | ${user.type} CREATED`,
                Number(user.id),
            ),
            sucess: true
        }
        res.json(result);
    } else {
        res.sendStatus(204).json({ sucess: false });
    }
}