import {Civilite} from "../models/Civilite";
import {CiviliteService} from "../services/CiviliteService";
import {PrismaClient} from "@prisma/client";

let civilite1: Civilite
let civilite2: Civilite
let civilite3: Civilite

const prisma_client = new PrismaClient()

beforeAll(async () => {
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
})

afterAll(async () => {
    const prisma_client = new PrismaClient()

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

beforeEach(() => {
    civilite1 = new Civilite(1, "Mr")
    civilite2 = new Civilite(2, "Mme")
    civilite3 = new Civilite(3, "Mlle")
});

test('get civilites', async () => {
    expect(await CiviliteService.findById(1)).toEqual(civilite1)
    expect(await CiviliteService.findAll()).toEqual([civilite1, civilite2, civilite3])
});

test('update civilite', async () => {
    await CiviliteService.update(2, {libelle: "test"})
    civilite2.libelle = "test"
    expect(await CiviliteService.findById(2)).toEqual(civilite2);
});

test('delete civilite', async () => {
    await CiviliteService.delete(1)
    expect(await CiviliteService.findById(1)).toEqual(null);
    expect(await CiviliteService.findAll()).toEqual([civilite2, civilite3])
});