import {Title} from "../models/Title";
import {TitleService} from "../services/TitleService";

let title1: Title
let title2: Title
let title3: Title

beforeEach(async () => {
    title1 = new Title(1, "Mr")
    title2 = new Title(2, "Mme")
    title3 = new Title(3, "Mlle")

    await TitleService.create(title1)
    await TitleService.create(title2)
    await TitleService.create(title3)
});

afterEach(async () => {
    await TitleService.delete(1)
    await TitleService.delete(2)
    await TitleService.delete(3)
});

test('get titles', async () => {
    expect(await TitleService.findById(1)).toEqual(title1)
    expect(await TitleService.findAll()).toEqual([title1, title2, title3])
});

test('update title', async () => {
    await TitleService.update(2, {libelle: "test"})
    title2.description = "test"
    expect(await TitleService.findById(2)).toEqual(title2);
});

test('delete title', async () => {
    await TitleService.delete(1)
    expect(await TitleService.findById(1)).toEqual(null);
    expect(await TitleService.findAll()).toEqual([title2, title3])
});