import {Contact} from "../models/Contact";
import {PrismaClient} from "@prisma/client";

const prisma_client = new PrismaClient()

export class ContactDao {
    async findAll() {
        let contacts: Contact[] = []

        const contacts_json = await prisma_client.contact.findMany()

        for (let contact_json of contacts_json) {
            const id_contact = contact_json['id_contact']
            const last_name = contact_json['nom']
            const first_name = contact_json['prenom']
            const email = contact_json['email']
            const title_id = contact_json['id_civilite']

            contacts.push(new Contact(id_contact, last_name, first_name, email, title_id))
        }

        return contacts;
    }

    async findById(id: number) {
        const contact_json = await prisma_client.contact.findUnique({
            where: {
                id_contact: id,
            }
        })

        if (contact_json !== null) {
            const id_contact = contact_json['id_contact']
            const last_name = contact_json['nom']
            const first_name = contact_json['prenom']
            const email = contact_json['email']
            const title_id = contact_json['id_civilite']

            return new Contact(id_contact, last_name, first_name, email, title_id);
        }

        return null
    }

    async create(contact: Contact) {
        await prisma_client.contact.create({
            data: {
                id_contact: contact.id,
                nom: contact.last_name,
                prenom: contact.first_name,
                id_civilite: contact.title_id,
                email: contact.email
            }
        })
    }

    async delete(id: number) {
        await prisma_client.contact.delete({
            where: {
                id_contact: id,
            }
        })
    }

    async update(id: number, body: any) {
        await prisma_client.contact.update({
            where: {
                id_contact: id,
            },
            data: body,
        })
    }
}