import {Civilite} from "../models/Civilite";
import {CiviliteService} from "../services/CiviliteService";

let civilite1: Civilite
let civilite2: Civilite
let civilite3: Civilite

beforeEach(async () => {
    civilite1 = new Civilite(1, "Mr")
    civilite2 = new Civilite(2, "Mme")
    civilite3 = new Civilite(3, "Mlle")

    await CiviliteService.create(civilite1)
    await CiviliteService.create(civilite2)
    await CiviliteService.create(civilite3)
});

afterEach(async () => {
    await CiviliteService.delete(1)
    await CiviliteService.delete(2)
    await CiviliteService.delete(3)
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