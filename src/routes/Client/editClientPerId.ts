import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function editClientPerId(req, res) {
    // const {
    //     id,
    //     name,
    //     cpf,
    //     cityId,
    //     adress,
    //     neighborhood,
    //     cep,
    //     birth,
    //     priceTable,
    //     userId
    // } = req.body;
    // try {
    //     if  (
    //         id &&
    //         name &&
    //         cpf &&
    //         cityId &&
    //         adress &&
    //         neighborhood &&
    //         cep &&
    //         birth &&
    //         priceTable &&
    //         userId
    //     ) {
    //         const oldClient = await prismaClient.clients.findUnique({
    //             where: { id: Number(id) },
    //         });
    //         const client = await prismaClient.clients.update({
    //             where: { id: Number(id) },
    //             data: {
    //                 name: name,
    //                 cpf: cpf,
    //                 cityId: cityId,
    //                 adress: adress,
    //                 neighborhood: neighborhood,
    //                 cep: cep,
    //                 birth: birth,
    //                 priceTable: priceTable,
    //             },
    //         });
    //         const result = {
    //             client: client,
    //             log: await generateLog(
    //                 "EDIT",
    //                 `CLIENT ${client.id} - NAME ${oldClient.name} CPF ${oldClient.cpf} CITY ${oldClient.cityId} ADRESS ${oldClient.name} NEIGHBORHOOD ${oldClient.neighborhood} CEP ${oldClient.cep} BIRTH ${oldClient.birth} PRICE TABLE ${oldClient.priceTable} NEW NAME ${client.name} NEW CPF ${client.cpf} NEW CITY ${client.cityId} NEW ADRESS ${client.name} NEW NEIGHBORHOOD ${client.neighborhood} NEW CEP ${client.cep} NEW BIRTH ${client.birth} NEW PRICE TABLE ${client.priceTable}`,
    //                 Number(userId)
    //             )
    //         }
    //         res.json(result);
    //     } else {
    //         res.sendStatus(400);
    //     }
    // } catch (err) {
    //     res.json(err);
    // }   
}