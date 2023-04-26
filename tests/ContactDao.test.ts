import {ContactService} from "../services/ContactService";
import {Contact} from "../models/Contact";
import {Title} from "../models/Title";
import {TitleService} from "../services/TitleService";

let contact1: Contact
let contact2: Contact

let title1: Title
let title2: Title
let title3: Title

beforeEach(async () => {
    contact1 = new Contact(1, "DUPONT", "Jean", "dupontj@3il.fr", 1)
    contact2 = new Contact(2, "DUPONT", "Michel", "dupontm@3il.fr", 2)

    title1 = new Title(1, "Mr")
    title2 = new Title(2, "Mme")
    title3 = new Title(3, "Mlle")

    await TitleService.create(title1)
    await TitleService.create(title2)
    await TitleService.create(title3)

    await ContactService.create(contact1)
    await ContactService.create(contact2)
});

afterEach(async () => {
    await ContactService.delete(1)
    await ContactService.delete(2)

    await TitleService.delete(1)
    await TitleService.delete(2)
    await TitleService.delete(3)
});

test('get contacts', async () => {
    expect(await ContactService.findById(1)).toEqual(contact1);
    expect(await ContactService.findAll()).toEqual([contact1, contact2])
});

test('update contact', async () => {
    await ContactService.update(2, {id_civilite: 1})
    contact2.title_id = 1
    expect(await ContactService.findById(2)).toEqual(contact2);
});

test('delete contact', async () => {
    await ContactService.delete(1)
    expect(await ContactService.findById(1)).toEqual(null);
    expect(await ContactService.findAll()).toEqual([contact2])
});