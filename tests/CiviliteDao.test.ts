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
    expect(await CiviliteService.findAll()).toEqual([civilite1, civilite2, civilite3])
});