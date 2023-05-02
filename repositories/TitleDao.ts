import {Title} from "../models/Title";
import {PrismaClient} from "@prisma/client";

const prisma_client = new PrismaClient()

export class TitleDao {
    async findAll() {
        let titles: Title[] = []

        const titles_json = await prisma_client.title.findMany()

        for (let title_json of titles_json) {
            const title_id = title_json['title_id']
            const description = title_json['description']

            titles.push(new Title(title_id, description))
        }

        return titles;
    }

    async findById(id: number) {
        const title_json = await prisma_client.title.findUnique({
            where: {
                title_id: id,
            }
        })

        if (title_json !== null) {
            const title_id = title_json['title_id']
            const description = title_json['description']

            return new Title(title_id, description);
        }

        return null
    }

    async create(title: Title) {
        await prisma_client.title.create({
            data: {
                title_id: title.id,
                description: title.description
            }
        })
    }

    async delete(id: number) {
        await prisma_client.title.delete({
            where: {
                title_id: id,
            }
        })
    }

    async update(id: number, body: any) {
        await prisma_client.title.update({
            where: {
                title_id: id,
            },
            data: body,
        })
    }
}