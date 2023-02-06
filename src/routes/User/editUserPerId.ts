import prismaClient from "../../controllers/prismaClient";

export default async function editUserPerId(req, res) {
    const { id, name, password } = req.body;
    if (id) {
        const user = await prismaClient.users.findUnique({
            where: { id: Number(id) },
        });
        const result = await prismaClient.users.update({
            where: { id: Number(id) },
            data: {
                name: name ? String(name) : user.name,
                password: password ? String(password) : user.password,
            },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
}