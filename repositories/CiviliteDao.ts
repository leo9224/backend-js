import {Civilite} from "../models/Civilite";
import {PrismaClient} from "@prisma/client";

const prisma_client = new PrismaClient()

export class CiviliteDao {
    async findAll() {
        let civilites: Civilite[] = []

        const civilites_json = await prisma_client.civilite.findMany()

        for (let civilite_json of civilites_json) {
            const id_civilite = civilite_json['id_civilite']
            const libelle = civilite_json['libelle']

            civilites.push(new Civilite(id_civilite, libelle))
        }

        return civilites;
    }

    async findById(id: number) {
        const civilite_json = await prisma_client.civilite.findUnique({
            where: {
                id_civilite: id,
            }
        })

        if (civilite_json !== null) {
            const id_civilite = civilite_json['id_civilite']
            const libelle = civilite_json['libelle']

            return new Civilite(id_civilite, libelle);
        }

        return null
    }

    async create(civilite: Civilite) {
        await prisma_client.civilite.create({
            data: {
                id_civilite: civilite.id,
                libelle: civilite.libelle
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