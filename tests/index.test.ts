import request from "supertest";
import {Contact} from "../models/Contact";
import {ContactService} from "../services/ContactService";
import server from "../index";
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
        id_contact: 5,
        nom: "FETTER",
        prenom: "Léo",
        email: "fetterl@3il.fr",
        id_civilite: 1
    });
    expect(response.text).toEqual("Contact created");
    expect(response.status).toEqual(200)
    server.close()
});

test("get one civilite", async () => {
    const response = await request(server).get("/civilites/1");
    expect(response.body).toEqual(civilite1);
    expect(response.status).toEqual(200)
    server.close()
});

test("get all civilites", async () => {
    const response = await request(server).get("/civilites");
    expect(response.body).toEqual([civilite1, civilite2, civilite3]);
    expect(response.status).toEqual(200)
    server.close()
});

test("update civilite", async () => {
    const response = await request(server).put("/civilites/1");
    expect(response.text).toEqual("Civilite updated");
    expect(response.status).toEqual(200)
    server.close()
});

test("delete civilite", async () => {
    const response = await request(server).delete("/civilites/3");
    expect(response.text).toEqual("Civilite deleted");
    expect(response.status).toEqual(200)
    server.close()
});

test("create civilite", async () => {
    const response = await request(server).post("/civilite").send({
        id_civilite: 4,
        libelle: "test"
    });
    expect(response.text).toEqual("Civilite created");
    expect(response.status).toEqual(200)
    server.close()
});
