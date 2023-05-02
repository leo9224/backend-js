-- CreateTable
CREATE TABLE "title" (
    "title_id" INTEGER NOT NULL,
    "description" VARCHAR(10) NOT NULL,

    CONSTRAINT "title_pk" PRIMARY KEY ("title_id")
);

-- CreateTable
CREATE TABLE "contact" (
    "contact_id" INTEGER NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "title_id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "contact_pk" PRIMARY KEY ("contact_id")
);

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_title_fk" FOREIGN KEY ("title_id") REFERENCES "title"("title_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
