import express = require('express')
import body_parser = require('body-parser')
import {Contact} from "./models/Contact";
import {ContactService} from "./services/ContactService";
import {TitleService} from "./services/TitleService";
import {Title} from "./models/Title";

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

    console.log("GET request /contacts")
})

app.get('/contacts/:id', async (request, response) => {
    const contact_id = parseInt(request.params.id);

    response.send(await ContactService.findById(contact_id))

    console.log("GET request /contacts/" + contact_id)
})

app.put('/contacts/:id', async (request, response) => {
    const contact_id = parseInt(request.params.id);

    await ContactService.update(contact_id, request.body)

    response.send("Contact updated")

    console.log("PUT request /contacts/" + contact_id)
})

app.post('/contacts', async (request, response) => {
    const contact_id = request.body.contact_id
    const last_name = request.body.last_name
    const first_name = request.body.first_name
    const email = request.body.email
    const title_id = request.body.title_id

    await ContactService.create(new Contact(contact_id, last_name, first_name, email, title_id))

    response.send("Contact created")

    console.log("POST request /contacts")
})

app.delete('/contacts/:id', async (request, response) => {
    const contact_id = parseInt(request.params.id);

    await ContactService.delete(contact_id)

    response.send("Contact deleted")

    console.log("DELETE request /contacts/" + contact_id)
})

app.get('/titles', async (request, response) => {
    response.send(await TitleService.findAll())

    console.log("GET request /titles")
})

app.get('/titles/:id', async (request, response) => {
    const title_id = parseInt(request.params.id);

    response.send(await TitleService.findById(title_id))

    console.log("GET request /titles/" + title_id)
})

app.put('/titles/:id', async (request, response) => {
    const title_id = parseInt(request.params.id);

    await TitleService.update(title_id, request.body)

    response.send("Title updated")

    console.log("PUT request /titles/" + title_id)
})

app.post('/titles', async (request, response) => {
    const title_id = request.body.title_id
    const description = request.body.description

    await TitleService.create(new Title(title_id, description))

    response.send("Title created")

    console.log("POST request /titles")
})

app.delete('/titles/:id', async (request, response) => {
    const title_id = parseInt(request.params.id);

    await TitleService.delete(title_id)

    response.send("Title deleted")

    console.log("DELETE request /titles/" + title_id)
})

const server = app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})

export default server