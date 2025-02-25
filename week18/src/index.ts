import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();


async function createUSer()
{
    await client.user.create({
        data:{
            username:'zia',
            passowrd:'zia23',
            age:22,
            city:'bhubaneswar'
        }
    })
}

createUSer();