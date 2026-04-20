/*
===============================================================================
 Auto95Clean - Seed Data (VALID ONLY)
-------------------------------------------------------------------------------
 Execute this file to populate test data without expected failures.
===============================================================================
*/

INSERT INTO utilisateur (prenom, nom, telephone, password_hash) VALUES
    ('Mohamed', 'ALI', '0677898684', '$argon2id$v=19$m=19456,t=2,p=1$YWY5NWUyYjJjODQ1YzJlODc4OWZlNmEwN2Y2MjU1M2Q$5Y8dkK7hFi6xuUNbsytCe6mRG387Eblxjr8dTo1tcAU'),
    ('Dante', 'ALIGHIERI', '0687586325', '$argon2id$v=19$m=19456,t=2,p=1$YWY5NWUyYjJjODQ1YzJlODc4OWZlNmEwN2Y2MjU1M2Q$3i8Pv7/tOYinNMT4Ek9omzxccq0pE2nNxtSPrgWwznM'),
    ('Sofia', 'MARTIN', '0601020304', '$argon2id$v=19$m=19456,t=2,p=1$YWY5NWUyYjJjODQ1YzJlODc4OWZlNmEwN2Y2MjU1M2Q$WJMS0f37JxkQbVf3FZ6W2L8Hf5cQhQ9lGQySAnM9mBw'),
    ('Lucas', 'BERNARD', '0602030405', '$argon2id$v=19$m=19456,t=2,p=1$YWY5NWUyYjJjODQ1YzJlODc4OWZlNmEwN2Y2MjU1M2Q$S5NfY8f8Qp8zTw3o9tK2pI9MVv0V7vWZV9i2eV6X4rA'),
    ('Emma', 'DUBOIS', '0603040506', '$argon2id$v=19$m=19456,t=2,p=1$YWY5NWUyYjJjODQ1YzJlODc4OWZlNmEwN2Y2MjU1M2Q$V3nq0n6rj8kC8QnW0M4jJfQ8bE9g3zK2wQ8fQf5U2rQ'),
    ('Hugo', 'THOMAS', '0604050607', '$argon2id$v=19$m=19456,t=2,p=1$YWY5NWUyYjJjODQ1YzJlODc4OWZlNmEwN2Y2MjU1M2Q$M4nV1hF9sN7QxX3Jk7wP9lA2xC6gQ9zN4kB8mW3qR1Y'),
    ('Lea', 'ROBERT', '0605060708', '$argon2id$v=19$m=19456,t=2,p=1$YWY5NWUyYjJjODQ1YzJlODc4OWZlNmEwN2Y2MjU1M2Q$K7jD8sQ3lM4nP9qR2wT5yH6uV1xZ8cB3mN6pQ2rW9tY'),
    ('Noah', 'RICHARD', '0606070809', '$argon2id$v=19$m=19456,t=2,p=1$YWY5NWUyYjJjODQ1YzJlODc4OWZlNmEwN2Y2MjU1M2Q$Q2wE4rT6yU8iO0pA3sD5fG7hJ9kL1zX3cV5bN7mM9qW');

INSERT INTO parrainage (code_ou_lien,statut,id_parrain,id_parraine) VALUES
    ('REF-MOHAMED-SOFIA','valide',1,3),
    ('REF-DANTE-EMMA','en_attente',2,5),
    ('REF-LUCAS-NOAH','expire',4,8);

INSERT INTO type_vehicule (libelle) VALUES
    ('citadine'),
    ('berline'),
    ('suv');

INSERT INTO formule (nom,description,duree_estimee_minutes) VALUES
    ('silver','Jantes,Shampoing,SÃ©chage,Vitres,Aspirateur',90),
    ('platinium','Jantes,Pneus,Shampoing,Cire de finition,SÃ©chage,Vitres,Plastiques,Tapis,Shampouinage,Tissus',120),
    ('gold','Jantes,Shampoing,Cire de finition,SÃ©chage,Vitres,Tapis / Moquette',150);

INSERT INTO service (nom,description) VALUES
    ('Jantes','Nettoyage des jantes pour retirer saletÃ©s et poussiÃ¨res de frein.'),
    ('Shampoing','Lavage carrosserie au shampoing auto pour nettoyer en douceur.'),
    ('SÃ©chage','SÃ©chage manuel pour Ã©viter traces eau et marques.'),
    ('Vitres','Nettoyage intÃ©rieur et extÃ©rieur des vitres pour une visibilitÃ© nette.'),
    ('Aspirateur','Aspiration de habitacle, siÃ¨ges et zones difficiles accÃ¨s.'),
    ('Pneus','Nettoyage des flancs et finition des pneus.'),
    ('Cire de finition','Application une cire de finition pour brillance et protection.'),
    ('Plastiques','Nettoyage et ravivage des plastiques intÃ©rieurs.'),
    ('Tapis','Nettoyage des tapis de sol pour enlever poussiÃ¨re et taches lÃ©gÃ¨res.'),
    ('Shampouinage','Nettoyage en profondeur des textiles par shampouinage.'),
    ('Tissus','Entretien des surfaces en tissu pour rafraÃ®chir habitacle.'),
    ('Tapis / Moquette','Nettoyage combinÃ© des tapis et de la moquette intÃ©rieure.');

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
    ('2026-04-18 17:00:00+02','2026-04-18 18:00:00+02',3),
    ('2026-04-19 09:00:00+02','2026-04-19 10:30:00+02',3),
    ('2026-04-19 11:00:00+02','2026-04-19 13:30:00+02',3),
    ('2026-04-20 08:30:00+02','2026-04-20 09:30:00+02',2),
    ('2026-04-20 10:00:00+02','2026-04-20 11:30:00+02',2),
    ('2026-04-20 14:00:00+02','2026-04-20 16:30:00+02',2);

INSERT INTO tarif(prix,id_type_vehicule,id_formule) VALUES
    (40.00,1,1),
    (60.00,2,1),
    (80.00,3,1),
    (60.00,1,2),
    (80.00,2,2),
    (120.00,3,2),
    (50.00,1,3),
    (70.00,2,3),
    (100.00,3,3);

INSERT INTO inclure (id_formule,id_service) VALUES
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (1,5),
    (2,1),
    (2,6),
    (2,2),
    (2,7),
    (2,3),
    (2,4),
    (2,8),
    (2,9),
    (2,10),
    (2,11),
    (3,1),
    (3,2),
    (3,7),
    (3,3),
    (3,4),
    (3,12);

INSERT INTO rendez_vous (statut,commentaire,prix_total,id_utilisateur,id_creneau,id_vehicule,id_type_vehicule,id_formule) VALUES
    ('PENDING_PAYMENT','Silver citadine - first booking',40.00,1,1,1,1,1),
    ('CONFIRMED','Platinium citadine confirmed',60.00,2,2,2,1,2),
    ('PENDING_PAYMENT','Silver berline pending payment',60.00,3,3,3,2,1),
    ('CONFIRMED','Gold SUV confirmed',100.00,4,4,4,3,3),
    ('PENDING_PAYMENT','Platinium SUV pending payment',120.00,5,5,5,3,2),
    ('COMPLETED','Gold citadine completed',50.00,6,6,6,1,3);

INSERT INTO paiement (montant,type_paiement,moyen,date_heure,reference_externe,statut,id_rendez_vous) VALUES
    (40.00,'prepaiement','carte','2026-04-19 09:20:00+00','PAY-RDV-0001','pending',1),
    (60.00,'prepaiement','carte','2026-04-19 09:25:00+00','PAY-RDV-0002','succeeded',2),
    (60.00,'prepaiement','paypal','2026-04-19 09:30:00+00','PAY-RDV-0003','failed',3),
    (100.00,'prepaiement','carte','2026-04-19 09:35:00+00','PAY-RDV-0004','succeeded',4),
    (120.00,'prepaiement','carte','2026-04-19 09:40:00+00','PAY-RDV-0005','pending',5),
    (50.00,'prepaiement','virement','2026-04-19 09:45:00+00','PAY-RDV-0006','succeeded',6);

INSERT INTO fidelite_mouvement (points,motif,date_obtention,date_expiration,id_utilisateur,id_rendez_vous) VALUES
    (10,'Premiere reservation','2026-04-19 10:20:00+00','2027-04-19 10:20:00+00',1,1),
    (20,'Paiement confirme','2026-04-19 10:25:00+00','2027-04-19 10:25:00+00',2,2),
    (-5,'Annulation tardive','2026-04-19 10:30:00+00','2026-12-31 23:59:59+00',3,3),
    (15,'Bonus fidelite mensuel','2026-04-19 10:35:00+00','2027-04-19 10:35:00+00',6,6),
    (5,'Parrainage valide','2026-04-19 10:40:00+00','2027-04-19 10:40:00+00',4,NULL);
