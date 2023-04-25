import request from "supertest";
import {Contact} from "../models/Contact";
import {ContactService} from "../services/ContactService";
import server from "../index";
import {PrismaClient} from "@prisma/client";
import {Civilite} from "../models/Civilite";

let contact1: Contact
let contact2: Contact
let civilite1: Civilite
let civilite2: Civilite
let civilite3: Civilite

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

afterAll(async () => {
    const prisma_client = new PrismaClient()

    await prisma_client.contact.delete({
        where: {
            id_contact: 5
        }
    })

    await prisma_client.civilite.delete({
        where: {
            id_civilite: 1
        }
    })

    await prisma_client.civilite.delete({
        where: {
            id_civilite: 2
        }
    })

    await prisma_client.civilite.delete({
        where: {
            id_civilite: 3
        }
    })
});

beforeEach(async () => {
    contact1 = new Contact(1, "DUPONT", "Jean", "dupontj@3il.fr", 1)
    contact2 = new Contact(2, "DUPONT", "Michel", "dupontm@3il.fr", 2)

    civilite1 = new Civilite(1, "Mr")
    civilite2 = new Civilite(2, "Mme")
    civilite3 = new Civilite(3, "Mlle")

    await ContactService.create(contact1)
    await ContactService.create(contact2)
});

afterEach(async () => {
    await ContactService.delete(1)
    await ContactService.delete(2)
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
