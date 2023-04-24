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
var ProjetB3_exports = {};
__export(ProjetB3_exports, {
  default: () => ProjetB3_default
});
module.exports = __toCommonJS(ProjetB3_exports);

// models/Contact.ts
var Contact = class {
  constructor(id, nom, prenom, email, civilite) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.id_civilite = civilite;
  }
};

// repositories/ContactDao.ts
var import_client = require("@prisma/client");
var prisma_client = new import_client.PrismaClient();
var ContactDao = class {
  create(contact) {
    return __async(this, null, function* () {
      yield prisma_client.contact.create({
        data: {
          id_contact: contact.id,
          nom: contact.nom,
          prenom: contact.prenom,
          id_civilite: contact.id_civilite,
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
  findAll() {
    return __async(this, null, function* () {
      let contacts = [];
      const contacts_json = yield prisma_client.contact.findMany();
      for (let contact_json of contacts_json) {
        const id_contact = contact_json["id_contact"];
        const nom = contact_json["nom"];
        const prenom = contact_json["prenom"];
        const email = contact_json["email"];
        const id_civilite = contact_json["id_civilite"];
        contacts.push(new Contact(id_contact, nom, prenom, email, id_civilite));
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
        const nom = contact_json["nom"];
        const prenom = contact_json["prenom"];
        const email = contact_json["email"];
        const id_civilite = contact_json["id_civilite"];
        return new Contact(id_contact, nom, prenom, email, id_civilite);
      }
      return null;
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
  static findById(id) {
    return __async(this, null, function* () {
      return yield contact_dao.findById(id);
    });
  }
  static update(id, body) {
    return __async(this, null, function* () {
      yield contact_dao.update(id, body);
    });
  }
};

// models/Civilite.ts
var Civilite = class {
  constructor(id, libelle) {
    this.id = id;
    this.libelle = libelle;
  }
};

// repositories/CiviliteDao.ts
var import_client2 = require("@prisma/client");
var prisma_client2 = new import_client2.PrismaClient();
var CiviliteDao = class {
  findAll() {
    return __async(this, null, function* () {
      let civilites = [];
      const civilites_json = yield prisma_client2.civilite.findMany();
      for (let civilite_json of civilites_json) {
        const id_civilite = civilite_json["id_civilite"];
        const libelle = civilite_json["libelle"];
        civilites.push(new Civilite(id_civilite, libelle));
      }
      return civilites;
    });
  }
};

// services/CiviliteService.ts
var civilite_dao = new CiviliteDao();
var CiviliteService = class {
  static findAll() {
    return __async(this, null, function* () {
      return yield civilite_dao.findAll();
    });
  }
};

// index.ts
var express = require("express");
var body_parser = require("body-parser");
var app = express();
var port = process.env.API_PORT;
app.disable("x-powered-by");
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
  const id_civilite = request.body.id_civilite;
  yield ContactService.create(new Contact(id_contact, nom, prenom, email, id_civilite));
  response.send("Contact created");
}));
app.delete("/contacts/:id", (request, response) => __async(void 0, null, function* () {
  const contact_id = parseInt(request.params.id);
  yield ContactService.delete(contact_id);
  response.send("Contact deleted");
}));
app.get("/civilites", (request, response) => __async(void 0, null, function* () {
  response.send(yield CiviliteService.findAll());
}));
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
var ProjetB3_default = app;
