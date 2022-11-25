import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateLog = async (
    type: string,
    description: string,
    userId: number
) => {
    const result = await prisma.logs.create({
        data: {
            type: type,
            description: description,
            userId: userId,
        },
    });
    return result;
};

export default generateLog;