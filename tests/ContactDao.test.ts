import {ContactService} from "../services/ContactService";
import {Contact} from "../models/Contact";
import {Civilite} from "../models/Civilite";
import {CiviliteService} from "../services/CiviliteService";

let contact1: Contact
let contact2: Contact

let civilite1: Civilite
let civilite2: Civilite
let civilite3: Civilite

beforeEach(async () => {
    contact1 = new Contact(1, "DUPONT", "Jean", "dupontj@3il.fr", 1)
    contact2 = new Contact(2, "DUPONT", "Michel", "dupontm@3il.fr", 2)

    civilite1 = new Civilite(1, "Mr")
    civilite2 = new Civilite(2, "Mme")
    civilite3 = new Civilite(3, "Mlle")

    await CiviliteService.create(civilite1)
    await CiviliteService.create(civilite2)
    await CiviliteService.create(civilite3)

    await ContactService.create(contact1)
    await ContactService.create(contact2)
});

afterEach(async () => {
    await ContactService.delete(1)
    await ContactService.delete(2)

    await CiviliteService.delete(1)
    await CiviliteService.delete(2)
    await CiviliteService.delete(3)
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