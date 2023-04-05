import {Civilite} from "../models/Civilite";
import {CiviliteService} from "../services/CiviliteService";

let civilite1: Civilite
let civilite2: Civilite
let civilite3: Civilite

beforeEach(async () => {
    civilite1 = new Civilite(1, "Mr")
    civilite2 = new Civilite(2, "Mme")
    civilite3 = new Civilite(3, "Mlle")
});

test('get civilites', async () => {
    expect(await CiviliteService.findAll()).toEqual([civilite1, civilite2, civilite3])
});