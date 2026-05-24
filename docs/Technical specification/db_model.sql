/*
===============================================================================
 Auto95Clean - Schema SQL PostgreSQL
-------------------------------------------------------------------------------
 FR - Objet:
 - Definir les types ENUM et les tables principales du domaine metier.
 - Servir de base de reference pour la modelisation et les migrations.
 - Ce schema a une vocation pedagogique et d'entrainement.
 - Le schema de production sera tres probablement gere avec Prisma.
 
 EN - Purpose:
 - Define ENUM types and core business tables.
 - Provide a baseline for data modeling and migrations.
 - This schema is intended for learning and practice.
 - The production schema will most likely be implemented with Prisma.
 
 Notes:
 - Cible: PostgreSQL (IDENTITY, ENUM natif, TIMESTAMP, DECIMAL/NUMERIC).
 - Les regles ON DELETE doivent suivre le metier:
   CASCADE pour donnees dependantes, RESTRICT pour historique sensible,
   SET NULL uniquement si la relation est optionnelle.
 - L'ordre de creation des tables compte pour les Foreign Keys.
===============================================================================
*/
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TYPE role_utilisateur AS ENUM ('ADMIN', 'AGENT', 'CLIENT');
CREATE TYPE statut_rdv AS ENUM ('PENDING_PAYMENT','CONFIRMED','CANCELED','EXPIRED','COMPLETED');
CREATE TYPE statut_creneau AS ENUM ('libre','complet','bloque','reserve');
CREATE TYPE statut_paiement AS ENUM ('pending','succeeded','failed','canceled','expired','refunded');
CREATE TYPE statut_parrainage AS ENUM ('en_attente', 'valide', 'expire');


CREATE TABLE creneau(
    id_creneau INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    statut statut_creneau NOT NULL DEFAULT 'libre',
    capacite INT NOT NULL,

    CHECK (end_at > start_at),
    CHECK (capacite > 0)
);

--ALTER TABLE creneau ALTER start_at SET DATA TYPE TIMESTAMP WITH TIME ZONE
--ALTER TABLE creneau ALTER end_at SET DATA TYPE TIMESTAMP WITH TIME ZONE
--Ok Done 11/04/26

CREATE TABLE utilisateur(
    id_utilisateur INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    prenom VARCHAR(100),
    nom VARCHAR(150),
    email CITEXT NOT NULL UNIQUE,
    telephone VARCHAR(20) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role role_utilisateur NOT NULL DEFAULT 'CLIENT',
    date_inscription TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    actif BOOLEAN NOT NULL DEFAULT TRUE
); --TEST INSERT OK 12/04/26

--ALTER TABLE utilisateur ALTER date_inscription SET DATA TYPE TIMESTAMP WITH TIME ZONE
--Ok Done 11/04/26

CREATE TABLE type_vehicule(
    id_type_vehicule INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    libelle VARCHAR(20) NOT NULL UNIQUE
   
); --TEST INSERT OK 12/04/26

CREATE TABLE vehicule(
    id_vehicule INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    marque VARCHAR(32),
    modele VARCHAR(80),
    immatriculation VARCHAR(20),

    id_utilisateur INT NOT NULL, 
    id_type_vehicule INT NOT NULL, 

    CONSTRAINT fk_vehicule_utilisateur
        FOREIGN KEY(id_utilisateur) 
        REFERENCES utilisateur(id_utilisateur)
        ON DELETE RESTRICT,

    CONSTRAINT fk_vehicule_type_vehicule
        FOREIGN KEY(id_type_vehicule)
        REFERENCES type_vehicule(id_type_vehicule)
        ON DELETE RESTRICT
); --TEST INSERT OK 12/04/26




CREATE TABLE parrainage(
    id_parrainage INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code_ou_lien VARCHAR(40),
    statut statut_parrainage NOT NULL DEFAULT 'en_attente',
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    id_parrain INTEGER NOT NULL,
    id_parraine INTEGER NOT NULL,

    CONSTRAINT fk_parrainage_parrain
        FOREIGN KEY(id_parrain) 
        REFERENCES utilisateur(id_utilisateur)
        ON DELETE RESTRICT,
    CONSTRAINT fk_parrainage_parraine
        FOREIGN KEY(id_parraine) 
        REFERENCES utilisateur(id_utilisateur)
        ON DELETE RESTRICT,

    CONSTRAINT uq_parrainage_parraine_unique UNIQUE (id_parraine),
    CONSTRAINT uq_parrainage_parrain_parraine UNIQUE (id_parrain, id_parraine),
    CONSTRAINT chk_parrainage_pas_auto CHECK (id_parrain <> id_parraine)
    
    
);

--ALTER TABLE parrainage ALTER date_creation SET DATA TYPE TIMESTAMP WITH TIME ZONE
--Ok Done 11/04/26

CREATE TABLE formule(
    id_formule INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200) ,
    duree_estimee_minutes INT NOT NULL CHECK (duree_estimee_minutes > 0),
    actif BOOLEAN NOT NULL DEFAULT TRUE
); --TEST INSERT OK 12/04/26

CREATE TABLE rendez_vous(
    id_rendez_vous INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    statut statut_rdv NOT NULL DEFAULT 'PENDING_PAYMENT',
    commentaire VARCHAR(255),
    prix_total DECIMAL(10,2) NOT NULL CHECK (prix_total >= 0),

    id_utilisateur INTEGER NOT NULL,
    id_creneau INTEGER NOT NULL,
    id_vehicule INTEGER ,
    id_type_vehicule INTEGER NOT NULL,
    id_formule INTEGER NOT NULL,
    
    CONSTRAINT fk_rendez_vous_utilisateur
        FOREIGN KEY(id_utilisateur) 
        REFERENCES utilisateur(id_utilisateur)
        ON DELETE RESTRICT,
    CONSTRAINT fk_rendez_vous_creneau
        FOREIGN KEY(id_creneau)
        REFERENCES creneau(id_creneau)
        ON DELETE RESTRICT,
    CONSTRAINT fk_rendez_vous_vehicule 
        FOREIGN KEY(id_vehicule) 
        REFERENCES vehicule(id_vehicule)
        ON DELETE RESTRICT,
    CONSTRAINT fk_rendez_vous_type_vehicule
        FOREIGN KEY(id_type_vehicule) 
        REFERENCES type_vehicule(id_type_vehicule)
        ON DELETE RESTRICT,
    CONSTRAINT fk_rendez_vous_formule
        FOREIGN KEY(id_formule) 
        REFERENCES formule(id_formule)
        ON DELETE RESTRICT

);

--ALTER TABLE rendez_vous ALTER date_creation SET DATA TYPE TIMESTAMP WITH TIME ZONE
--Ok Done 11/04/26

CREATE TABLE fidelite_mouvement(
    id_mouvement INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    points INT NOT NULL CHECK (points <> 0),
    motif VARCHAR(50),
    date_obtention TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_expiration TIMESTAMP NOT NULL,
    CHECK (date_expiration >= date_obtention),

    id_utilisateur INT NOT NULL,
    id_rendez_vous INT ,

    CONSTRAINT fk_fidelite_mouvement_utilisateur
        FOREIGN KEY(id_utilisateur)
        REFERENCES utilisateur(id_utilisateur)
        ON DELETE RESTRICT,
    CONSTRAINT fk_fidelite_mouvement_rendez_vous
        FOREIGN KEY(id_rendez_vous)
        REFERENCES rendez_vous(id_rendez_vous)
        ON DELETE RESTRICT
);

--ALTER TABLE fidelite_mouvement ALTER date_obtention SET DATA TYPE TIMESTAMP WITH TIME ZONE
--ALTER TABLE fidelite_mouvement ALTER date_expiration SET DATA TYPE TIMESTAMP WITH TIME ZONE
--Ok Done 12/04/26

CREATE TABLE paiement(
    id_paiement INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    montant DECIMAL(10,2) NOT NULL CHECK (montant >= 0),
    type_paiement VARCHAR(20) NOT NULL,
    moyen VARCHAR(20) NOT NULL,
    date_heure TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reference_externe VARCHAR(255),
    statut statut_paiement  NOT NULL DEFAULT 'pending',
   
   id_rendez_vous INT NOT NULL,

    CONSTRAINT fk_paiement_rendez_vous
        FOREIGN KEY(id_rendez_vous)
        REFERENCES rendez_vous(id_rendez_vous)
        ON DELETE RESTRICT
);

--ALTER TABLE paiement ALTER date_heure SET DATA TYPE TIMESTAMP WITH TIME ZONE
--Ok Done 12/04/26

CREATE TABLE service(
    id_service INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description VARCHAR(200) ,
    actif BOOLEAN NOT NULL DEFAULT TRUE
); --Ok Done 12/04/26


CREATE TABLE tarif(
    id_tarif INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),

    id_type_vehicule INT NOT NULL,
    id_formule INT NOT NULL,
    
  
    CONSTRAINT fk_tarif_type_vehicule
        FOREIGN KEY(id_type_vehicule)
        REFERENCES type_vehicule(id_type_vehicule)
        ON DELETE RESTRICT,
    CONSTRAINT fk_tarif_formule
        FOREIGN KEY(id_formule)
        REFERENCES formule(id_formule)
        ON DELETE RESTRICT,
    
    CONSTRAINT uq_tarif_formule_type_vehicule UNIQUE(id_formule,id_type_vehicule)
);

CREATE TABLE inclure (
  id_formule INT NOT NULL,
  id_service INT NOT NULL,

  CONSTRAINT pk_inclure PRIMARY KEY (id_formule, id_service),
  CONSTRAINT fk_inclure_formule
    FOREIGN KEY (id_formule) REFERENCES formule(id_formule) ON DELETE CASCADE,
  CONSTRAINT fk_inclure_service
    FOREIGN KEY (id_service) REFERENCES service(id_service) ON DELETE RESTRICT
);
