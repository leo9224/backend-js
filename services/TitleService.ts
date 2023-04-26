import {TitleDao} from "../repositories/TitleDao";
import {Title} from "../models/Title";

const titleDao = new TitleDao()

export class TitleService {
    static async findAll() {
        return await titleDao.findAll()
    }

    static async findById(id: number) {
        return await titleDao.findById(id)
    }

    static async create(title: Title) {
        await titleDao.create(title)
    }

    static async delete(id: number) {
        if (await this.findById(id) !== null)
            await titleDao.delete(id)
    }

    static async update(id: number, body: any) {
        await titleDao.update(id, body)
    }
}