import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function createNewClient (req, res) {
    const { id, name, cpf, cityCode, cep, neighborhood, street, adressNumber, complement, userId } =
        req.body;
    try {
        if (
            name &&
            cpf &&
            cityCode &&
            cep &&
            neighborhood &&
            street &&
            adressNumber &&
            complement &&
            userId
        ) {
            const client = await prismaClient.clients.create({
                data: {
                    id: id,
                    name: name,
                    cpf: cpf,
                    cityCode: cityCode,
                    cep: cep,
                    neighborhood: neighborhood,
                    street: street,
                    adressNumber: adressNumber,
                    complement: complement
                },
            });
            const result = {
                client: client,
                log: await generateLog(
                    "CREATE",
                    `CLIENT ${client.id} - ${client.name} CREATED`,
                    Number(userId)
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