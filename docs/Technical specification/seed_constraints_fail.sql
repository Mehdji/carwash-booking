/*
===============================================================================
 Auto95Clean - Constraint Negative Tests (MUST FAIL)
-------------------------------------------------------------------------------
 Prerequisite:
 1) Execute db_model.sql
 2) Execute seed_valid.sql
 3) Execute this file and verify each statement fails for the expected reason
===============================================================================
*/

--Test CONSTRAINT chk_parrainage_pas_auto
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-SELF-TEST','en_attente',1,1);

--Test CONSTRAINT uq_parrainage_parraine_unique
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-DUP-PARRAINE','en_attente',6,3);

--Test CONSTRAINT uq_parrainage_parrain_parraine
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-DUP-PAIR','valide',1,3);

--Test CONSTRAINT fk_parrainage_parrain
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-FK-PARRAIN','en_attente',999,7);

--Test CONSTRAINT fk_parrainage_parraine
INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-FK-PARRAINE','en_attente',7,999);

--Test CHECK formule.duree_estimee_minutes > 0
INSERT INTO formule (nom,description,duree_estimee_minutes) VALUES
    ('bronze','Formule invalide pour test CHECK',0);

--Test CONSTRAINT UNIQUE formule.nom
INSERT INTO formule (nom,description,duree_estimee_minutes) VALUES
    ('silver','Duplicate name for unique test',45);

--Test CHECK end_at > start_at
INSERT INTO creneau(start_at,end_at,capacite) VALUES
    ('2026-04-22 17:00:00+02','2026-04-22 16:00:00+02',3);

--Test CONSTRAINT uq_tarif_formule_type_vehicule
INSERT INTO tarif(prix,id_type_vehicule,id_formule) VALUES
    (40.00,1,1);

--Test CONSTRAINT pk_inclure
INSERT INTO inclure (id_formule,id_service) VALUES
    (1,1);

--Test CONSTRAINT fk_inclure_formule
INSERT INTO inclure (id_formule,id_service) VALUES
    (999,1);

--Test CONSTRAINT fk_inclure_service
INSERT INTO inclure (id_formule,id_service) VALUES
    (1,999);

--Test CHECK paiement.montant >= 0
INSERT INTO paiement (montant,type_paiement,moyen,date_heure,reference_externe,statut,id_rendez_vous) VALUES
    (-10.00,'prepaiement','carte','2026-04-19 10:00:00+00','PAY-NEGATIVE','pending',1);

--Test CONSTRAINT fk_paiement_rendez_vous
INSERT INTO paiement (montant,type_paiement,moyen,date_heure,reference_externe,statut,id_rendez_vous) VALUES
    (40.00,'prepaiement','carte','2026-04-19 10:05:00+00','PAY-BAD-FK','pending',999);

--Test ENUM statut_paiement
INSERT INTO paiement (montant,type_paiement,moyen,date_heure,reference_externe,statut,id_rendez_vous) VALUES
    (40.00,'prepaiement','carte','2026-04-19 10:10:00+00','PAY-BAD-STATUS','processing',1);

--Test CHECK fidelite_mouvement.points <> 0
INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (0,'Points nuls invalides','2026-04-19 10:45:00+00','2027-04-19 10:45:00+00',1,1);

--Test CHECK fidelite_mouvement.date_expiration >= date_obtention
INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (10,'Dates invalides','2026-04-19 11:00:00+00','2026-04-18 11:00:00+00',2,2);

--Test CONSTRAINT fk_fidelite_mouvement_utilisateur
INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (10,'Utilisateur inexistant','2026-04-19 11:05:00+00','2027-04-19 11:05:00+00',999,1);

--Test CONSTRAINT fk_fidelite_mouvement_rendez_vous
INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (10,'RDV inexistant','2026-04-19 11:10:00+00','2027-04-19 11:10:00+00',1,999);
