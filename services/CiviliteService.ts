import {CiviliteDao} from "../repositories/CiviliteDao";
import {Contact} from "../models/Contact";
import {Civilite} from "../models/Civilite";

const civilite_dao = new CiviliteDao()

export class CiviliteService {
    static async findAll() {
        return await civilite_dao.findAll()
    }

    static async findById(id: number) {
        return await civilite_dao.findById(id)
    }

    static async create(civilite: Civilite) {
        await civilite_dao.create(civilite)
    }

    static async delete(id: number) {
        if (await this.findById(id) !== null)
            await civilite_dao.delete(id)
    }

    static async update(id: number, body: any) {
        await civilite_dao.update(id, body)
    }
}