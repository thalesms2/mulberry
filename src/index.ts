import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/api/dish", async (req, res) => {
    const { name, price } = req.body;
    const result = await prisma.dish.create({
        data: {
            name,
            price,
            available: false,
        },
    });
    res.json(result);
});

app.get("/api/dish", async (req, res) => {
    const dishes = await prisma.dish.findMany();
    res.json(dishes);
});

app.put("/api/dish", async (req, res) => {
    const { id, name, price } = req.query;
    const result = await prisma.dish.update({
        where: {
            id: String(id),
        },
        data: {
            name: String(name),
            price: Number(price),
        },
    });
    res.json(result);
});

app.post("/api/category", async (req, res) => {
    const { name } = req.query
    const result = await prisma.category.create({
        data: {
            name: String(name)
        }
    })
    res.json(result)
})

const port = 3000;
app.listen(port, () =>
    console.log(`🚀 Server ready at: http://localhost:${port}`));
