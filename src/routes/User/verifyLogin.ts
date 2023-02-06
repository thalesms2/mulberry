import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";
import { Prisma } from "@prisma/client";

export default async function verifyLogin(req, res) {
    const { id, password } = req.body;
    try {
        const user = await prismaClient.users.findUnique({
            where: { id: Number(id) },
        });
        if (String(password) == String(user.password)) {
            const result = {
                login: true,
                id: user.id,
                name: user.name,
                log: await generateLog(
                    "LOGIN",
                    `LOGIN USER ${user.id} - ${user.name}`,
                    user.id
                ),
            };
            res.cookie("userId", user.id).json(result);
        } else {
            res.json({
                login: false,
                message: 'wrong'
            })
        }
    } catch(err) {
        if(err instanceof Prisma.PrismaClientKnownRequestError) {
            const message = err.code
            res.json({
                login: false,
                type: 'knownReqError',
                message: message
            })
        } else if(err instanceof Prisma.PrismaClientUnknownRequestError) {
            const message = err.message
            res.json({
                login: false,
                type: 'unknownReqError',
                message: message
            })
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            const message = err.message
            res.json({
                login: false,
                type: 'clientValidationError',
                message: message
        })
        } else {
            res.json({
                login: false,
                message: 'error'
            })
        }
        
    }
}