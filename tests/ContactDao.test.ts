import {ContactService} from "../services/ContactService";
import {Contact} from "../models/Contact";
import {PrismaClient} from "@prisma/client";

let contact1: Contact
let contact2: Contact

beforeAll(async () => {
    const prisma_client = new PrismaClient()

    await prisma_client.civilite.create({
        data: {
            id_civilite: 1,
            libelle: "Mr"
        }
    })

    await prisma_client.civilite.create({
        data: {
            id_civilite: 2,
            libelle: "Mme"
        }
    })

    await prisma_client.civilite.create({
        data: {
            id_civilite: 3,
            libelle: "Mlle"
        }
    })
});

beforeEach(async () => {
    contact1 = new Contact(1, "DUPONT", "Jean", "dupontj@3il.fr", 1)
    contact2 = new Contact(2, "DUPONT", "Michel", "dupontm@3il.fr", 2)

    await ContactService.create(contact1)
    await ContactService.create(contact2)
});

afterEach(async () => {
    await ContactService.delete(1)
    await ContactService.delete(2)
});

test('get contacts', async () => {
    expect(await ContactService.findById(1)).toEqual(contact1);
    expect(await ContactService.findAll()).toEqual([contact1, contact2])
});

test('update contact', async () => {
    await ContactService.update(2, {id_civilite: 1})
    contact2.id_civilite = 1
    expect(await ContactService.findById(2)).toEqual(contact2);
});

test('delete contact', async () => {
    await ContactService.delete(1)
    expect(await ContactService.findById(1)).toEqual(null);
    expect(await ContactService.findAll()).toEqual([contact2])
});