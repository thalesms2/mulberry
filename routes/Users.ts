import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import generateLog from "../controllers/generateLog";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const { id, password } = req.body;
    try {
        const user = await prisma.users.findUnique({
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
});

router.post("/create", async (req, res) => {
    const { name, password } = req.body;
    if (name) {
        const create = await prisma.users.create({
            data: {
                name: String(name),
                password: password ? String(password) : "0000",
            },
        });
        const result = {
            create: create,
            sucess: true
        }
        res.json(result);
    } else {
        res.sendStatus(204).json({ sucess: false });
    }
});

router.put("/", async (req, res) => {
    const { id, name, password } = req.body;
    if (id) {
        const user = await prisma.users.findUnique({
            where: { id: Number(id) },
        });
        const result = await prisma.users.update({
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
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
    if (id) {
        const result = await prisma.users.delete({
            where: { id: Number(id) },
        });
        res.json(result);
    } else {
        res.sendStatus(204);
    }
});

export default router;
