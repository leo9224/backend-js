import request from "supertest";
import {Contact} from "../models/Contact";
import {ContactService} from "../services/ContactService";
import server from "../index";
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

test("get one contact", async () => {
    const response = await request(server).get("/contacts/1");
    expect(response.body).toEqual(contact1);
    expect(response.status).toEqual(200)
    server.close()
});

test("get all contact", async () => {
    const response = await request(server).get("/contacts");
    expect(response.body).toEqual([contact1, contact2]);
    expect(response.status).toEqual(200)
    server.close()
});

test("update contact", async () => {
    const response = await request(server).put("/contacts/1");
    expect(response.text).toEqual("Contact updated");
    expect(response.status).toEqual(200)
    server.close()
});

test("delete contact", async () => {
    const response = await request(server).delete("/contacts/1");
    expect(response.text).toEqual("Contact deleted");
    expect(response.status).toEqual(200)
    server.close()
});

test("create contact", async () => {
    const response = await request(server).post("/contact").send({
        contact_id: 5,
        last_name: "FETTER",
        first_name: "Léo",
        email: "fetterl@3il.fr",
        title_id: 1
    });
    expect(response.text).toEqual("Contact created");
    expect(response.status).toEqual(200)

    await ContactService.delete(5)

    server.close()
});

test("get one title", async () => {
    const response = await request(server).get("/titles/1");
    expect(response.body).toEqual(title1);
    expect(response.status).toEqual(200)
    server.close()
});

test("get all titles", async () => {
    const response = await request(server).get("/titles");
    expect(response.body).toEqual([title1, title2, title3]);
    expect(response.status).toEqual(200)
    server.close()
});

test("update title", async () => {
    const response = await request(server).put("/titles/1");
    expect(response.text).toEqual("Title updated");
    expect(response.status).toEqual(200)
    server.close()
});

test("delete title", async () => {
    const response = await request(server).delete("/titles/3");
    expect(response.text).toEqual("Title deleted");
    expect(response.status).toEqual(200)
    server.close()
});

test("create title", async () => {
    const response = await request(server).post("/title").send({
        title_id: 4,
        description: "test"
    });
    expect(response.text).toEqual("Title created");
    expect(response.status).toEqual(200)

    await TitleService.delete(4)

    server.close()
});
