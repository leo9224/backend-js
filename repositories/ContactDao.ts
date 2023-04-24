import {Contact} from "../models/Contact";
import {PrismaClient} from "@prisma/client";

const prisma_client = new PrismaClient()

export class ContactDao {
    async create(contact: Contact) {
        await prisma_client.contact.create({
            data: {
                id_contact: contact.id,
                nom: contact.nom,
                prenom: contact.prenom,
                id_civilite: contact.id_civilite,
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

    async findAll() {
        let contacts: Contact[] = []

        const contacts_json = await prisma_client.contact.findMany()

        for (let contact_json of contacts_json) {
            const id_contact = contact_json['id_contact']
            const nom = contact_json['nom']
            const prenom = contact_json['prenom']
            const email = contact_json['email']
            const id_civilite = contact_json['id_civilite']

            contacts.push(new Contact(id_contact, nom, prenom, email, id_civilite))
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
            const nom = contact_json['nom']
            const prenom = contact_json['prenom']
            const email = contact_json['email']
            const id_civilite = contact_json['id_civilite']

            return new Contact(id_contact, nom, prenom, email, id_civilite);
        }

        return null
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