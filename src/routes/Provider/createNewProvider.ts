import prismaClient from "../../controllers/prismaClient";
import generateLog from "../../controllers/generateLog";

export default async function createNewProvider(req, res) {
    const {
        id,
        socialName,
        fantasyName,
        cnpj,
        ie,
        cep,
        cityCode,
        street,
        adressNumber,
        neighborhood,
        complement,
        userId,
    } = req.body;
    try {
        if (
            id &&
            socialName &&
            fantasyName &&
            cnpj &&
            ie &&
            cep &&
            cityCode &&
            street &&
            adressNumber &&
            neighborhood &&
            complement &&
            userId
        ) {
            const provider = await prismaClient.provider.create({
                data: {
                    id: Number(id),
                    socialName: String(socialName),
                    fantasyName: String(fantasyName),
                    cnpj: String(cnpj),
                    ie: String(ie),
                    cep: String(cep),
                    cityCode: Number(cityCode),
                    street: String(street),
                    adressNumber: String(adressNumber),
                    neighborhood: String(neighborhood),
                    complement: String(complement),
                },
            });
            const result = {
                provider: provider,
                log: await generateLog(
                    "CREATE",
                    `PROVIDER ${provider.id} - ${provider.socialName} CREATED`,
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
