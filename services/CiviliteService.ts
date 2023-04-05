import {CiviliteDao} from "../repositories/CiviliteDao";

const civilite_dao = new CiviliteDao()

export class CiviliteService {
    static async findAll() {
        return await civilite_dao.findAll()
    }
}