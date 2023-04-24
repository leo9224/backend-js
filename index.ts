import express = require('express')
import body_parser = require('body-parser')
import {Contact} from "./models/Contact";
import {ContactService} from "./services/ContactService";
import {CiviliteService} from "./services/CiviliteService";

const app = express()
const port = process.env.API_PORT

app.disable("x-powered-by");

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

    await ContactService.create(new Contact(id_contact, nom, prenom, email, id_civilite!))

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

const server = app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})

export default server