-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateEnum
CREATE TYPE "public"."role_utilisateur" AS ENUM ('ADMIN', 'AGENT', 'CLIENT');

-- CreateEnum
CREATE TYPE "public"."statut_creneau" AS ENUM ('libre', 'complet', 'bloque', 'reserve');

-- CreateEnum
CREATE TYPE "public"."statut_paiement" AS ENUM ('pending', 'succeeded', 'failed', 'canceled', 'expired', 'refunded');

-- CreateEnum
CREATE TYPE "public"."statut_parrainage" AS ENUM ('en_attente', 'valide', 'expire');

-- CreateEnum
CREATE TYPE "public"."statut_rdv" AS ENUM ('PENDING_PAYMENT', 'CONFIRMED', 'CANCELED', 'EXPIRED', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."creneau" (
    "id_creneau" SERIAL NOT NULL,
    "start_at" TIMESTAMPTZ(6) NOT NULL,
    "end_at" TIMESTAMPTZ(6) NOT NULL,
    "statut" "public"."statut_creneau" NOT NULL DEFAULT 'libre',
    "capacite" INTEGER NOT NULL,

    CONSTRAINT "creneau_pkey" PRIMARY KEY ("id_creneau")
);

-- CreateTable
CREATE TABLE "public"."fidelite_mouvement" (
    "id_mouvement" SERIAL NOT NULL,
    "points" INTEGER NOT NULL,
    "motif" VARCHAR(50),
    "date_obtention" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_expiration" TIMESTAMPTZ(6) NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,
    "id_rendez_vous" INTEGER,

    CONSTRAINT "fidelite_mouvement_pkey" PRIMARY KEY ("id_mouvement")
);

-- CreateTable
CREATE TABLE "public"."formule" (
    "id_formule" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200),
    "duree_estimee_minutes" INTEGER NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "formule_pkey" PRIMARY KEY ("id_formule")
);

-- CreateTable
CREATE TABLE "public"."inclure" (
    "id_formule" INTEGER NOT NULL,
    "id_service" INTEGER NOT NULL,

    CONSTRAINT "pk_inclure" PRIMARY KEY ("id_formule","id_service")
);

-- CreateTable
CREATE TABLE "public"."paiement" (
    "id_paiement" SERIAL NOT NULL,
    "montant" DECIMAL(10,2) NOT NULL,
    "type_paiement" VARCHAR(20) NOT NULL,
    "moyen" VARCHAR(20) NOT NULL,
    "date_heure" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reference_externe" VARCHAR(255),
    "statut" "public"."statut_paiement" NOT NULL DEFAULT 'pending',
    "id_rendez_vous" INTEGER NOT NULL,

    CONSTRAINT "paiement_pkey" PRIMARY KEY ("id_paiement")
);

-- CreateTable
CREATE TABLE "public"."parrainage" (
    "id_parrainage" SERIAL NOT NULL,
    "code_ou_lien" VARCHAR(40),
    "statut" "public"."statut_parrainage" NOT NULL DEFAULT 'en_attente',
    "date_creation" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_parrain" INTEGER NOT NULL,
    "id_parraine" INTEGER NOT NULL,

    CONSTRAINT "parrainage_pkey" PRIMARY KEY ("id_parrainage")
);

-- CreateTable
CREATE TABLE "public"."rendez_vous" (
    "id_rendez_vous" SERIAL NOT NULL,
    "date_creation" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" "public"."statut_rdv" NOT NULL DEFAULT 'PENDING_PAYMENT',
    "commentaire" VARCHAR(255),
    "prix_total" DECIMAL(10,2) NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,
    "id_creneau" INTEGER NOT NULL,
    "id_vehicule" INTEGER,
    "id_type_vehicule" INTEGER NOT NULL,
    "id_formule" INTEGER NOT NULL,

    CONSTRAINT "rendez_vous_pkey" PRIMARY KEY ("id_rendez_vous")
);

-- CreateTable
CREATE TABLE "public"."service" (
    "id_service" SERIAL NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id_service")
);

-- CreateTable
CREATE TABLE "public"."tarif" (
    "id_tarif" SERIAL NOT NULL,
    "prix" DECIMAL(10,2) NOT NULL,
    "id_type_vehicule" INTEGER NOT NULL,
    "id_formule" INTEGER NOT NULL,

    CONSTRAINT "tarif_pkey" PRIMARY KEY ("id_tarif")
);

-- CreateTable
CREATE TABLE "public"."type_vehicule" (
    "id_type_vehicule" SERIAL NOT NULL,
    "libelle" VARCHAR(20) NOT NULL,

    CONSTRAINT "type_vehicule_pkey" PRIMARY KEY ("id_type_vehicule")
);

-- CreateTable
CREATE TABLE "public"."utilisateur" (
    "id_utilisateur" SERIAL NOT NULL,
    "prenom" VARCHAR(100),
    "nom" VARCHAR(150),
    "telephone" VARCHAR(20) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "public"."role_utilisateur" NOT NULL DEFAULT 'CLIENT',
    "date_inscription" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "email" CITEXT,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "public"."vehicule" (
    "id_vehicule" SERIAL NOT NULL,
    "marque" VARCHAR(32),
    "modele" VARCHAR(80),
    "immatriculation" VARCHAR(20),
    "id_utilisateur" INTEGER NOT NULL,
    "id_type_vehicule" INTEGER NOT NULL,

    CONSTRAINT "vehicule_pkey" PRIMARY KEY ("id_vehicule")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "formule_nom_key" ON "public"."formule"("nom" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "uq_parrainage_parrain_parraine" ON "public"."parrainage"("id_parrain" ASC, "id_parraine" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "uq_parrainage_parraine_unique" ON "public"."parrainage"("id_parraine" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "uq_tarif_formule_type_vehicule" ON "public"."tarif"("id_formule" ASC, "id_type_vehicule" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "type_vehicule_libelle_key" ON "public"."type_vehicule"("libelle" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_email_key" ON "public"."utilisateur"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_telephone_key" ON "public"."utilisateur"("telephone" ASC);

-- AddForeignKey
ALTER TABLE "public"."fidelite_mouvement" ADD CONSTRAINT "fk_fidelite_mouvement_rendez_vous" FOREIGN KEY ("id_rendez_vous") REFERENCES "public"."rendez_vous"("id_rendez_vous") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."fidelite_mouvement" ADD CONSTRAINT "fk_fidelite_mouvement_utilisateur" FOREIGN KEY ("id_utilisateur") REFERENCES "public"."utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."inclure" ADD CONSTRAINT "fk_inclure_formule" FOREIGN KEY ("id_formule") REFERENCES "public"."formule"("id_formule") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."inclure" ADD CONSTRAINT "fk_inclure_service" FOREIGN KEY ("id_service") REFERENCES "public"."service"("id_service") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."paiement" ADD CONSTRAINT "fk_paiement_rendez_vous" FOREIGN KEY ("id_rendez_vous") REFERENCES "public"."rendez_vous"("id_rendez_vous") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."parrainage" ADD CONSTRAINT "fk_parrainage_parrain" FOREIGN KEY ("id_parrain") REFERENCES "public"."utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."parrainage" ADD CONSTRAINT "fk_parrainage_parraine" FOREIGN KEY ("id_parraine") REFERENCES "public"."utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."rendez_vous" ADD CONSTRAINT "fk_rendez_vous_creneau" FOREIGN KEY ("id_creneau") REFERENCES "public"."creneau"("id_creneau") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."rendez_vous" ADD CONSTRAINT "fk_rendez_vous_formule" FOREIGN KEY ("id_formule") REFERENCES "public"."formule"("id_formule") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."rendez_vous" ADD CONSTRAINT "fk_rendez_vous_type_vehicule" FOREIGN KEY ("id_type_vehicule") REFERENCES "public"."type_vehicule"("id_type_vehicule") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."rendez_vous" ADD CONSTRAINT "fk_rendez_vous_utilisateur" FOREIGN KEY ("id_utilisateur") REFERENCES "public"."utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."rendez_vous" ADD CONSTRAINT "fk_rendez_vous_vehicule" FOREIGN KEY ("id_vehicule") REFERENCES "public"."vehicule"("id_vehicule") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tarif" ADD CONSTRAINT "fk_tarif_formule" FOREIGN KEY ("id_formule") REFERENCES "public"."formule"("id_formule") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tarif" ADD CONSTRAINT "fk_tarif_type_vehicule" FOREIGN KEY ("id_type_vehicule") REFERENCES "public"."type_vehicule"("id_type_vehicule") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."vehicule" ADD CONSTRAINT "fk_vehicule_type_vehicule" FOREIGN KEY ("id_type_vehicule") REFERENCES "public"."type_vehicule"("id_type_vehicule") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."vehicule" ADD CONSTRAINT "fk_vehicule_utilisateur" FOREIGN KEY ("id_utilisateur") REFERENCES "public"."utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE NO ACTION;
