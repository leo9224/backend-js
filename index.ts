import express = require('express')
import body_parser = require('body-parser')
import {Contact} from "./models/Contact";
import {ContactService} from "./services/ContactService";
import {CiviliteService} from "./services/CiviliteService";
import {Civilite} from "./models/Civilite";

const app = express()
const port = process.env.API_PORT
const cors = require('cors');
let corsOptions = {
    origin: 'http://localhost:3001' // Compliant
};

app.disable("x-powered-by");
app.use(cors(corsOptions))

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))

app.get('/contacts', async (request, response) => {
    response.send(await ContactService.findAll())
})

app.get('/contacts/:id', async (request, response) => {
    const contact_id = parseInt(request.params.id);

    response.send(await ContactService.findById(contact_id))
})

app.put('/contacts/:id', async (request, response) => {
    const contact_id = parseInt(request.params.id);

    await ContactService.update(contact_id, request.body)

    response.send("Contact updated")
})

app.post('/contact', async (request, response) => {
    const id_contact = request.body.id_contact
    const nom = request.body.nom
    const prenom = request.body.prenom
    const email = request.body.email
    const id_civilite = request.body.id_civilite

    await ContactService.create(new Contact(id_contact, nom, prenom, email, id_civilite))

    response.send("Contact created")
})

app.delete('/contacts/:id', async (request, response) => {
    const contact_id = parseInt(request.params.id);

    await ContactService.delete(contact_id)

    response.send("Contact deleted")
})

app.get('/civilites', async (request, response) => {
    response.send(await CiviliteService.findAll())
})

app.get('/civilites/:id', async (request, response) => {
    const civilite_id = parseInt(request.params.id);

    response.send(await CiviliteService.findById(civilite_id))
})

app.put('/civilites/:id', async (request, response) => {
    const civilite_id = parseInt(request.params.id);

    await CiviliteService.update(civilite_id, request.body)

    response.send("Civilite updated")
})

app.post('/civilite', async (request, response) => {
    const id_civilite = request.body.id_civilite
    const libelle = request.body.libelle

    await CiviliteService.create(new Civilite(id_civilite, libelle))

    response.send("Civilite created")
})

app.delete('/civilites/:id', async (request, response) => {
    const civilite_id = parseInt(request.params.id);

    await CiviliteService.delete(civilite_id)

    response.send("Civilite deleted")
})

const server = app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})

export default server