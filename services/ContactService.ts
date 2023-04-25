import {Contact} from "../models/Contact";
import {ContactDao} from "../repositories/ContactDao";

const contact_dao = new ContactDao()

export class ContactService {
    static async findAll() {
        return await contact_dao.findAll()
    }

    static async findById(id: number) {
        return await contact_dao.findById(id)
    }

    static async create(contact: Contact) {
        await contact_dao.create(contact)
    }

    static async delete(id: number) {
        if (await this.findById(id) !== null)
            await contact_dao.delete(id)
    }

    static async update(id: number, body: any) {
        await contact_dao.update(id, body)
    }
}