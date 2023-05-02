import {Contact} from "../models/Contact";
import {PrismaClient} from "@prisma/client";

const prisma_client = new PrismaClient()

export class ContactDao {
    async findAll() {
        let contacts: Contact[] = []

        const contacts_json = await prisma_client.contact.findMany()

        for (let contact_json of contacts_json) {
            const id_contact = contact_json['contact_id']
            const last_name = contact_json['last_name']
            const first_name = contact_json['first_name']
            const email = contact_json['email']
            const title_id = contact_json['title_id']

            contacts.push(new Contact(id_contact, last_name, first_name, email, title_id))
        }

        return contacts;
    }

    async findById(id: number) {
        const contact_json = await prisma_client.contact.findUnique({
            where: {
                contact_id: id,
            }
        })

        if (contact_json !== null) {
            const id_contact = contact_json['contact_id']
            const last_name = contact_json['last_name']
            const first_name = contact_json['first_name']
            const email = contact_json['email']
            const title_id = contact_json['title_id']

            return new Contact(id_contact, last_name, first_name, email, title_id);
        }

        return null
    }

    async create(contact: Contact) {
        await prisma_client.contact.create({
            data: {
                contact_id: contact.id,
                last_name: contact.last_name,
                first_name: contact.first_name,
                title_id: contact.title_id,
                email: contact.email
            }
        })
    }

    async delete(id: number) {
        await prisma_client.contact.delete({
            where: {
                contact_id: id,
            }
        })
    }

    async update(id: number, body: any) {
        await prisma_client.contact.update({
            where: {
                contact_id: id,
            },
            data: body,
        })
    }
}