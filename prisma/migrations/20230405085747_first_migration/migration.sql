-- CreateTable
CREATE TABLE "civilite" (
    "id_civilite" INTEGER NOT NULL,
    "libelle" VARCHAR(10) NOT NULL,

    CONSTRAINT "civilite_pk" PRIMARY KEY ("id_civilite")
);

-- CreateTable
CREATE TABLE "contact" (
    "id_contact" INTEGER NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "prenom" VARCHAR(50) NOT NULL,
    "id_civilite" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "contact_pk" PRIMARY KEY ("id_contact")
);

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_civilite_fk" FOREIGN KEY ("id_civilite") REFERENCES "civilite"("id_civilite") ON DELETE NO ACTION ON UPDATE NO ACTION;
