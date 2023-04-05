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
}