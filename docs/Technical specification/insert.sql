/*
===============================================================================
 Auto95Clean - Seed Data (INSERT)
-------------------------------------------------------------------------------
 FR - Contexte:
 - Ce fichier contient des jeux de donnees de test/initialisation pour la base.
 - Les inserts suivent le schema defini dans `db_model.sql`.
 - Il inclut aussi certains inserts volontairement invalides pour tester des
   contraintes (sections marquees `--Must fail`).

 EN - Context:
 - This file contains seed/test data used to initialize the database.
 - Inserts are aligned with the schema defined in `db_model.sql`.
 - It also includes intentionally invalid inserts to validate constraints
   (sections marked with `--Must fail`).

 Table Coverage Status
 - [x] creneau
 - [x] utilisateur
 - [x] type_vehicule
 - [x] vehicule
 - [x] parrainage
 - [x] formule
 - [x] rendez_vous
 - [x] fidelite_mouvement
 - [x] paiement
 - [x] service
 - [x] tarif
 - [x] inclure
===============================================================================
*/
-- Password (plaintext): Mohamed#A95Z1
INSERT INTO utilisateur (prenom, nom, email, telephone, password_hash) VALUES
    ('Mohamed', 'ALI', 'mohamed.ali@example.com', '0677898684', '$argon2id$v=19$m=19456,t=2,p=1$WrGG+vF33lkZi/D3+0pPTA$T0hRuQ4JKdSrQAnc2aG5er/5lrdUMPilRhepsq7MyGg');

-- Password (plaintext): Dante#A95Z123
INSERT INTO utilisateur (prenom, nom, email, telephone, password_hash) VALUES
    ('Dante', 'ALIGHIERI', 'dante.alighieri@example.com', '0687586325', '$argon2id$v=19$m=19456,t=2,p=1$o8hfTLdDAUjTWuIzRrIJtA$NMEtIMTcsFYYDCZokZKN7890F6d2uSEpLWJXKagfXK4');

-- Password (plaintext): Sofia#A95Z123
INSERT INTO utilisateur (prenom, nom, email, telephone, password_hash) VALUES
    ('Sofia', 'MARTIN', 'sofia.martin@example.com', '0601020304', '$argon2id$v=19$m=19456,t=2,p=1$DMmd5V1vFP3Hi5hb0e5LPw$UpozLgh5DcfffADeZ7RHd7kgU9h5DX3+hbAcHy4RN/k');

-- Password (plaintext): Lucas#A95Z123
INSERT INTO utilisateur (prenom, nom, email, telephone, password_hash) VALUES
    ('Lucas', 'BERNARD', 'lucas.bernard@example.com', '0602030405', '$argon2id$v=19$m=19456,t=2,p=1$H9c60jgLzaljdXdFHDObNQ$oqqhXmVg9INZlSIGzXdFL99zom3n9OvVvh014a/idxg');

-- Password (plaintext): Emma#A95Z1234
INSERT INTO utilisateur (prenom, nom, email, telephone, password_hash) VALUES
    ('Emma', 'DUBOIS', 'emma.dubois@example.com', '0603040506', '$argon2id$v=19$m=19456,t=2,p=1$ueDyrrcNkOVTJYX/0/p6Zg$n8Hmqj30byoI8e68guU02PCHkCx5tn2PL/513SVT+Fs');

-- Password (plaintext): Hugo#A95Z1234
INSERT INTO utilisateur (prenom, nom, email, telephone, password_hash) VALUES
    ('Hugo', 'THOMAS', 'hugo.thomas@example.com', '0604050607', '$argon2id$v=19$m=19456,t=2,p=1$8mEsvrfadx6KZNpJGdztDA$Z35BUKjD7ZUfT++ehGPp9GbqxUZLdn9Kymtbb9s00Nk');

-- Password (plaintext): Lea#A95Z12345
INSERT INTO utilisateur (prenom, nom, email, telephone, password_hash) VALUES
    ('Lea', 'ROBERT', 'lea.robert@example.com', '0605060708', '$argon2id$v=19$m=19456,t=2,p=1$mB3u/nhbjBGLkewerkZWIQ$mK6aOkhOdisQZvLlFIHgynLci0d5TQQxEte2sryDDAU');

-- Password (plaintext): Noah#A95Z1234
INSERT INTO utilisateur (prenom, nom, email, telephone, password_hash) VALUES
    ('Noah', 'RICHARD', 'noah.richard@example.com', '0606070809', '$argon2id$v=19$m=19456,t=2,p=1$huWj5OjOj1T/StSxzC5LTw$FDdjCRV+bA31iiW84MlMmCeS1nTJXQCupXaaDX0TveE');

-- Password (plaintext): Admin#A95Z123
INSERT INTO utilisateur (prenom, nom, email, telephone, password_hash, role) VALUES
    ('Admin', 'AUTO95CLEAN', 'admin@auto95clean.fr', '0600000000', '$argon2id$v=19$m=19456,t=2,p=1$5KvLqp9CRWzBhd7L4cuhRg$vLdjRjVA1tvhhVNBXUpVs52l5l8PzQxS8R/VbQs67HI', 'ADMIN');

INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-MOHAMED-SOFIA','valide',1,3),
    ('REF-DANTE-EMMA','en_attente',2,5),
    ('REF-LUCAS-NOAH','expire',4,8);

--Test CONSTRAINT chk_parrainage_pas_auto
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-SELF-TEST','en_attente',1,1); --Must fail

--Test CONSTRAINT uq_parrainage_parraine_unique
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-DUP-PARRAINE','en_attente',6,3); --Must fail (id_parraine already used)

--Test CONSTRAINT uq_parrainage_parrain_parraine
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-DUP-PAIR','valide',1,3); --Must fail (pair already exists)

--Test CONSTRAINT fk_parrainage_parrain
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-FK-PARRAIN','en_attente',999,7); --Must fail (id_parrain does not exist)

--Test CONSTRAINT fk_parrainage_parraine
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-FK-PARRAINE','en_attente',7,999); --Must fail (id_parraine does not exist)

INSERT INTO type_vehicule (libelle) VALUES
    ('citadine'),
    ('berline'),
    ('suv');

INSERT INTO formule (nom,description,duree_estimee_minutes) VALUES
    ('silver','Jantes,Shampoing,Séchage,Vitres,Aspirateur',90),
    ('platinium','Jantes,Pneus,Shampoing,Cire de finition,Séchage,Vitres,Plastiques,Tapis,Shampouinage,Tissus',120),
    ('gold','Jantes,Shampoing,Cire de finition,Séchage,Vitres,Tapis / Moquette',150);

--Test CHECK formule.duree_estimee_minutes > 0
INSERT INTO formule (nom,description,duree_estimee_minutes) VALUES
    ('bronze','Formule invalide pour test CHECK',0); --Must fail

--Test CONSTRAINT UNIQUE formule.nom
INSERT INTO formule (nom,description,duree_estimee_minutes) VALUES
    ('silver','Duplicate name for unique test',45); --Must fail

INSERT INTO service (nom,description) VALUES
    ('Jantes','Nettoyage des jantes pour retirer saletés et poussières de frein.'),
    ('Shampoing','Lavage carrosserie au shampoing auto pour nettoyer en douceur.'),
    ('Séchage','Séchage manuel pour éviter traces eau et marques.'),
    ('Vitres','Nettoyage intérieur et extérieur des vitres pour une visibilité nette.'),
    ('Aspirateur','Aspiration de habitacle, sièges et zones difficiles accès.'),
    ('Pneus','Nettoyage des flancs et finition des pneus.'),
    ('Cire de finition','Application une cire de finition pour brillance et protection.'),
    ('Plastiques','Nettoyage et ravivage des plastiques intérieurs.'),
    ('Tapis','Nettoyage des tapis de sol pour enlever poussière et taches légères.'),
    ('Shampouinage','Nettoyage en profondeur des textiles par shampouinage.'),
    ('Tissus','Entretien des surfaces en tissu pour rafraîchir habitacle.'),
    ('Tapis / Moquette','Nettoyage combiné des tapis et de la moquette intérieure.');

INSERT INTO vehicule (marque,modele,immatriculation,id_utilisateur,id_type_vehicule) VALUES
    ('renault','clio','AC-613-ET',1,1),
    ('peugeot','208','BZ-472-KL',2,1),
    ('dacia','sandero','DH-951-MQ',3,2),
    ('toyota','rav4','GN-284-TR',4,3),
    ('nissan','qashqai','JP-639-VC',5,3),
    ('fiat','500','LK-715-NS',6,1),
    ('volkswagen','tiguan','MN-482-RP',7,3),
    ('hyundai','i20','QR-157-TX',8,2);

INSERT INTO creneau(start_at,end_at,capacite) VALUES
    ('2026-05-18 17:00:00+02','2026-05-18 18:00:00+02',3),  -- 60'
    ('2026-05-19 09:00:00+02','2026-05-19 10:30:00+02',3),  -- 90'
    ('2026-05-19 11:00:00+02','2026-05-19 13:30:00+02',3),  -- 150'
    ('2026-05-20 08:30:00+02','2026-05-20 09:30:00+02',2),  -- 60'
    ('2026-05-20 10:00:00+02','2026-05-20 11:30:00+02',2),  -- 90'
    ('2026-05-20 14:00:00+02','2026-05-20 16:30:00+02',2);  -- 150'

    --Test CHECK end_at > start_at
    INSERT INTO creneau(start_at,end_at,capacite) VALUES
    ('2026-05-22 17:00:00+02','2026-05-22 16:00:00+02',3);  -- 60'
    --Must fail

INSERT INTO tarif(prix,id_type_vehicule,id_formule) VALUES
    (40.00,1,1), -- silver / citadine
    (60.00,2,1), -- silver / berline
    (80.00,3,1), -- silver / suv
    (60.00,1,2), -- platinium(platinum) / citadine
    (80.00,2,2), -- platinium(platinum) / berline
    (120.00,3,2), -- platinium(platinum) / suv
    (50.00,1,3), -- gold / citadine
    (70.00,2,3), -- gold / berline
    (100.00,3,3); -- gold / suv

--Test CONSTRAINT UNIQ
INSERT INTO tarif(prix,id_type_vehicule,id_formule) VALUES
    (40.00,1,1), -- silver / citadine
--Must fail


INSERT INTO inclure (id_formule,id_service) VALUES
    (1,1), -- silver / Jantes
    (1,2), -- silver / Shampoing
    (1,3), -- silver / Sechage
    (1,4), -- silver / Vitres
    (1,5), -- silver / Aspirateur
    (2,1), -- platinium / Jantes
    (2,6), -- platinium / Pneus
    (2,2), -- platinium / Shampoing
    (2,7), -- platinium / Cire de finition
    (2,3), -- platinium / Sechage
    (2,4), -- platinium / Vitres
    (2,8), -- platinium / Plastiques
    (2,9), -- platinium / Tapis
    (2,10), -- platinium / Shampouinage
    (2,11), -- platinium / Tissus
    (3,1), -- gold / Jantes
    (3,2), -- gold / Shampoing
    (3,7), -- gold / Cire de finition
    (3,3), -- gold / Sechage
    (3,4), -- gold / Vitres
    (3,12); -- gold / Tapis / Moquette

--Test CONSTRAINT pk_inclure
INSERT INTO inclure (id_formule,id_service) VALUES
    (1,1); --Must fail (already exists)

--Test CONSTRAINT fk_inclure_formule
INSERT INTO inclure (id_formule,id_service) VALUES
    (999,1); --Must fail (id_formule does not exist)

--Test CONSTRAINT fk_inclure_service
INSERT INTO inclure (id_formule,id_service) VALUES
    (1,999); --Must fail (id_service does not exist)

INSERT INTO rendez_vous (statut,commentaire,prix_total,id_utilisateur,id_creneau,id_vehicule,id_type_vehicule,id_formule) VALUES
    ('PENDING_PAYMENT','Silver citadine - first booking',40.00,1,1,1,1,1),
    ('CONFIRMED','Platinium citadine confirmed',60.00,2,2,2,1,2),
    ('PENDING_PAYMENT','Silver berline pending payment',60.00,3,3,3,2,1),
    ('CONFIRMED','Gold SUV confirmed',100.00,4,4,4,3,3),
    ('PENDING_PAYMENT','Platinium SUV pending payment',120.00,5,5,5,3,2),
    ('COMPLETED','Gold citadine completed',50.00,6,6,6,1,3);

INSERT INTO paiement (montant,type_paiement,moyen,date_heure,reference_externe,statut,id_rendez_vous) VALUES
    (40.00,'prepaiement','carte','2026-05-19 09:20:00+00','PAY-RDV-0001','pending',1),
    (60.00,'prepaiement','carte','2026-05-19 09:25:00+00','PAY-RDV-0002','succeeded',2),
    (60.00,'prepaiement','paypal','2026-05-19 09:30:00+00','PAY-RDV-0003','failed',3),
    (100.00,'prepaiement','carte','2026-05-19 09:35:00+00','PAY-RDV-0004','succeeded',4),
    (120.00,'prepaiement','carte','2026-05-19 09:40:00+00','PAY-RDV-0005','pending',5),
    (50.00,'prepaiement','virement','2026-05-19 09:45:00+00','PAY-RDV-0006','succeeded',6);

--Test CHECK paiement.montant >= 0
INSERT INTO paiement (montant,type_paiement,moyen,date_heure,reference_externe,statut,id_rendez_vous) VALUES
    (-10.00,'prepaiement','carte','2026-05-19 10:00:00+00','PAY-NEGATIVE','pending',1); --Must fail

--Test CONSTRAINT fk_paiement_rendez_vous
INSERT INTO paiement (montant,type_paiement,moyen,date_heure,reference_externe,statut,id_rendez_vous) VALUES
    (40.00,'prepaiement','carte','2026-05-19 10:05:00+00','PAY-BAD-FK','pending',999); --Must fail

--Test ENUM statut_paiement
INSERT INTO paiement (montant,type_paiement,moyen,date_heure,reference_externe,statut,id_rendez_vous) VALUES
    (40.00,'prepaiement','carte','2026-05-19 10:10:00+00','PAY-BAD-STATUS','processing',1); --Must fail

INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (10,'Premiere reservation','2026-05-19 10:20:00+00','2027-05-19 10:20:00+00',1,1),
    (20,'Paiement confirme','2026-05-19 10:25:00+00','2027-05-19 10:25:00+00',2,2),
    (-5,'Annulation tardive','2026-05-19 10:30:00+00','2026-12-31 23:59:59+00',3,3),
    (15,'Bonus fidelite mensuel','2026-05-19 10:35:00+00','2027-05-19 10:35:00+00',6,6),
    (5,'Parrainage valide','2026-05-19 10:40:00+00','2027-05-19 10:40:00+00',4,NULL);

--Test CHECK fidelite_mouvement.points <> 0
INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (0,'Points nuls invalides','2026-05-19 10:45:00+00','2027-05-19 10:45:00+00',1,1); --Must fail

--Test CHECK fidelite_mouvement.date_expiration >= date_obtention
INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (10,'Dates invalides','2026-05-19 11:00:00+00','2026-05-18 11:00:00+00',2,2); --Must fail

--Test CONSTRAINT fk_fidelite_mouvement_utilisateur
INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (10,'Utilisateur inexistant','2026-05-19 11:05:00+00','2027-05-19 11:05:00+00',999,1); --Must fail

--Test CONSTRAINT fk_fidelite_mouvement_rendez_vous
INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (10,'RDV inexistant','2026-05-19 11:10:00+00','2027-05-19 11:10:00+00',1,999); --Must fail
