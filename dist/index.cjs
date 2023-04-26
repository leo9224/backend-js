"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// index.ts
var backend3il_exports = {};
__export(backend3il_exports, {
  default: () => backend3il_default
});
module.exports = __toCommonJS(backend3il_exports);

// models/Contact.ts
var Contact = class {
  constructor(id, last_name, first_name, email, title_id) {
    this.id = id;
    this.last_name = last_name;
    this.first_name = first_name;
    this.email = email;
    this.title_id = title_id;
  }
};

// repositories/ContactDao.ts
var import_client = require("@prisma/client");
var prisma_client = new import_client.PrismaClient();
var ContactDao = class {
  findAll() {
    return __async(this, null, function* () {
      let contacts = [];
      const contacts_json = yield prisma_client.contact.findMany();
      for (let contact_json of contacts_json) {
        const id_contact = contact_json["id_contact"];
        const last_name = contact_json["nom"];
        const first_name = contact_json["prenom"];
        const email = contact_json["email"];
        const title_id = contact_json["id_civilite"];
        contacts.push(new Contact(id_contact, last_name, first_name, email, title_id));
      }
      return contacts;
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      const contact_json = yield prisma_client.contact.findUnique({
        where: {
          id_contact: id
        }
      });
      if (contact_json !== null) {
        const id_contact = contact_json["id_contact"];
        const last_name = contact_json["nom"];
        const first_name = contact_json["prenom"];
        const email = contact_json["email"];
        const title_id = contact_json["id_civilite"];
        return new Contact(id_contact, last_name, first_name, email, title_id);
      }
      return null;
    });
  }
  create(contact) {
    return __async(this, null, function* () {
      yield prisma_client.contact.create({
        data: {
          id_contact: contact.id,
          nom: contact.last_name,
          prenom: contact.first_name,
          id_civilite: contact.title_id,
          email: contact.email
        }
      });
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      yield prisma_client.contact.delete({
        where: {
          id_contact: id
        }
      });
    });
  }
  update(id, body) {
    return __async(this, null, function* () {
      yield prisma_client.contact.update({
        where: {
          id_contact: id
        },
        data: body
      });
    });
  }
};

// services/ContactService.ts
var contact_dao = new ContactDao();
var ContactService = class {
  static findAll() {
    return __async(this, null, function* () {
      return yield contact_dao.findAll();
    });
  }
  static findById(id) {
    return __async(this, null, function* () {
      return yield contact_dao.findById(id);
    });
  }
  static create(contact) {
    return __async(this, null, function* () {
      yield contact_dao.create(contact);
    });
  }
  static delete(id) {
    return __async(this, null, function* () {
      if ((yield this.findById(id)) !== null)
        yield contact_dao.delete(id);
    });
  }
  static update(id, body) {
    return __async(this, null, function* () {
      yield contact_dao.update(id, body);
    });
  }
};

// models/Title.ts
var Title = class {
  constructor(id, description) {
    this.id = id;
    this.description = description;
  }
};

// repositories/TitleDao.ts
var import_client2 = require("@prisma/client");
var prisma_client2 = new import_client2.PrismaClient();
var TitleDao = class {
  findAll() {
    return __async(this, null, function* () {
      let titles = [];
      const titles_json = yield prisma_client2.civilite.findMany();
      for (let title_json of titles_json) {
        const title_id = title_json["id_civilite"];
        const description = title_json["libelle"];
        titles.push(new Title(title_id, description));
      }
      return titles;
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      const title_json = yield prisma_client2.civilite.findUnique({
        where: {
          id_civilite: id
        }
      });
      if (title_json !== null) {
        const title_id = title_json["id_civilite"];
        const description = title_json["libelle"];
        return new Title(title_id, description);
      }
      return null;
    });
  }
  create(title) {
    return __async(this, null, function* () {
      yield prisma_client2.civilite.create({
        data: {
          id_civilite: title.id,
          libelle: title.description
        }
      });
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      yield prisma_client2.civilite.delete({
        where: {
          id_civilite: id
        }
      });
    });
  }
  update(id, body) {
    return __async(this, null, function* () {
      yield prisma_client2.civilite.update({
        where: {
          id_civilite: id
        },
        data: body
      });
    });
  }
};

// services/TitleService.ts
var titleDao = new TitleDao();
var TitleService = class {
  static findAll() {
    return __async(this, null, function* () {
      return yield titleDao.findAll();
    });
  }
  static findById(id) {
    return __async(this, null, function* () {
      return yield titleDao.findById(id);
    });
  }
  static create(title) {
    return __async(this, null, function* () {
      yield titleDao.create(title);
    });
  }
  static delete(id) {
    return __async(this, null, function* () {
      if ((yield this.findById(id)) !== null)
        yield titleDao.delete(id);
    });
  }
  static update(id, body) {
    return __async(this, null, function* () {
      yield titleDao.update(id, body);
    });
  }
};

// index.ts
var express = require("express");
var body_parser = require("body-parser");
var app = express();
var port = process.env.API_PORT;
var cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3001"
  // Compliant
};
app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.get("/contacts", (request, response) => __async(void 0, null, function* () {
  response.send(yield ContactService.findAll());
}));
app.get("/contacts/:id", (request, response) => __async(void 0, null, function* () {
  const contact_id = parseInt(request.params.id);
  response.send(yield ContactService.findById(contact_id));
}));
app.put("/contacts/:id", (request, response) => __async(void 0, null, function* () {
  const contact_id = parseInt(request.params.id);
  yield ContactService.update(contact_id, request.body);
  response.send("Contact updated");
}));
app.post("/contact", (request, response) => __async(void 0, null, function* () {
  const id_contact = request.body.id_contact;
  const nom = request.body.nom;
  const prenom = request.body.prenom;
  const email = request.body.email;
  const title_id = request.body.id_civilite;
  yield ContactService.create(new Contact(id_contact, nom, prenom, email, title_id));
  response.send("Contact created");
}));
app.delete("/contacts/:id", (request, response) => __async(void 0, null, function* () {
  const contact_id = parseInt(request.params.id);
  yield ContactService.delete(contact_id);
  response.send("Contact deleted");
}));
app.get("/titles", (request, response) => __async(void 0, null, function* () {
  response.send(yield TitleService.findAll());
}));
app.get("/titles/:id", (request, response) => __async(void 0, null, function* () {
  const title_id = parseInt(request.params.id);
  response.send(yield TitleService.findById(title_id));
}));
app.put("/titles/:id", (request, response) => __async(void 0, null, function* () {
  const title_id = parseInt(request.params.id);
  yield TitleService.update(title_id, request.body);
  response.send("Title updated");
}));
app.post("/title", (request, response) => __async(void 0, null, function* () {
  const title_id = request.body.id_civilite;
  const description = request.body.libelle;
  yield TitleService.create(new Title(title_id, description));
  response.send("Title created");
}));
app.delete("/titles/:id", (request, response) => __async(void 0, null, function* () {
  const title_id = parseInt(request.params.id);
  yield TitleService.delete(title_id);
  response.send("Title deleted");
}));
var server = app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
var backend3il_default = server;
