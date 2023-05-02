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

app.post('/contacts', async (request, response) => {
    const contact_id = request.body.contact_id
    const last_name = request.body.last_name
    const first_name = request.body.first_name
    const email = request.body.email
    const title_id = request.body.title_id

    await ContactService.create(new Contact(contact_id, last_name, first_name, email, title_id))

    response.send("Contact created")
})

app.delete('/contacts/:id', async (request, response) => {
    const contact_id = parseInt(request.params.id);

    await ContactService.delete(contact_id)

    response.send("Contact deleted")
})

app.get('/titles', async (request, response) => {
    response.send(await TitleService.findAll())
})

app.get('/titles/:id', async (request, response) => {
    const title_id = parseInt(request.params.id);

    response.send(await TitleService.findById(title_id))
})

app.put('/titles/:id', async (request, response) => {
    const title_id = parseInt(request.params.id);

    await TitleService.update(title_id, request.body)

    response.send("Title updated")
})

app.post('/titles', async (request, response) => {
    const title_id = request.body.title_id
    const description = request.body.description

    await TitleService.create(new Title(title_id, description))

    response.send("Title created")
})

app.delete('/titles/:id', async (request, response) => {
    const title_id = parseInt(request.params.id);

    await TitleService.delete(title_id)

    response.send("Title deleted")
})

const server = app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})

export default server