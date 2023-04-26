import {Title} from "../models/Title";
import {PrismaClient} from "@prisma/client";

const prisma_client = new PrismaClient()

export class TitleDao {
    async findAll() {
        let titles: Title[] = []

        const titles_json = await prisma_client.civilite.findMany()

        for (let title_json of titles_json) {
            const title_id = title_json['id_civilite']
            const description = title_json['libelle']

            titles.push(new Title(title_id, description))
        }

        return titles;
    }

    async findById(id: number) {
        const title_json = await prisma_client.civilite.findUnique({
            where: {
                id_civilite: id,
            }
        })

        if (title_json !== null) {
            const title_id = title_json['id_civilite']
            const description = title_json['libelle']

            return new Title(title_id, description);
        }

        return null
    }

    async create(title: Title) {
        await prisma_client.civilite.create({
            data: {
                id_civilite: title.id,
                libelle: title.description
            }
        })
    }

    async delete(id: number) {
        await prisma_client.civilite.delete({
            where: {
                id_civilite: id,
            }
        })
    }

    async update(id: number, body: any) {
        await prisma_client.civilite.update({
            where: {
                id_civilite: id,
            },
            data: body,
        })
    }
}