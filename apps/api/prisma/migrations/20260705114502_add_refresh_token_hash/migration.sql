/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `utilisateur` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "fidelite_mouvement" DROP CONSTRAINT "fk_fidelite_mouvement_rendez_vous";

-- DropForeignKey
ALTER TABLE "fidelite_mouvement" DROP CONSTRAINT "fk_fidelite_mouvement_utilisateur";

-- DropForeignKey
ALTER TABLE "inclure" DROP CONSTRAINT "fk_inclure_formule";

-- DropForeignKey
ALTER TABLE "inclure" DROP CONSTRAINT "fk_inclure_service";

-- DropForeignKey
ALTER TABLE "paiement" DROP CONSTRAINT "fk_paiement_rendez_vous";

-- DropForeignKey
ALTER TABLE "parrainage" DROP CONSTRAINT "fk_parrainage_parrain";

-- DropForeignKey
ALTER TABLE "parrainage" DROP CONSTRAINT "fk_parrainage_parraine";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "fk_rendez_vous_creneau";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "fk_rendez_vous_formule";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "fk_rendez_vous_type_vehicule";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "fk_rendez_vous_utilisateur";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "fk_rendez_vous_vehicule";

-- DropForeignKey
ALTER TABLE "tarif" DROP CONSTRAINT "fk_tarif_formule";

-- DropForeignKey
ALTER TABLE "tarif" DROP CONSTRAINT "fk_tarif_type_vehicule";

-- DropForeignKey
ALTER TABLE "vehicule" DROP CONSTRAINT "fk_vehicule_type_vehicule";

-- DropForeignKey
ALTER TABLE "vehicule" DROP CONSTRAINT "fk_vehicule_utilisateur";

-- AlterTable
ALTER TABLE "inclure" RENAME CONSTRAINT "pk_inclure" TO "inclure_pkey";

-- AlterTable
ALTER TABLE "utilisateur" ADD COLUMN     "refresh_token_hash" VARCHAR(255),
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "vehicule" ADD CONSTRAINT "vehicule_id_type_vehicule_fkey" FOREIGN KEY ("id_type_vehicule") REFERENCES "type_vehicule"("id_type_vehicule") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicule" ADD CONSTRAINT "vehicule_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parrainage" ADD CONSTRAINT "parrainage_id_parrain_fkey" FOREIGN KEY ("id_parrain") REFERENCES "utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parrainage" ADD CONSTRAINT "parrainage_id_parraine_fkey" FOREIGN KEY ("id_parraine") REFERENCES "utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_id_creneau_fkey" FOREIGN KEY ("id_creneau") REFERENCES "creneau"("id_creneau") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_id_vehicule_fkey" FOREIGN KEY ("id_vehicule") REFERENCES "vehicule"("id_vehicule") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_id_type_vehicule_fkey" FOREIGN KEY ("id_type_vehicule") REFERENCES "type_vehicule"("id_type_vehicule") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_id_formule_fkey" FOREIGN KEY ("id_formule") REFERENCES "formule"("id_formule") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fidelite_mouvement" ADD CONSTRAINT "fidelite_mouvement_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fidelite_mouvement" ADD CONSTRAINT "fidelite_mouvement_id_rendez_vous_fkey" FOREIGN KEY ("id_rendez_vous") REFERENCES "rendez_vous"("id_rendez_vous") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paiement" ADD CONSTRAINT "paiement_id_rendez_vous_fkey" FOREIGN KEY ("id_rendez_vous") REFERENCES "rendez_vous"("id_rendez_vous") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarif" ADD CONSTRAINT "tarif_id_type_vehicule_fkey" FOREIGN KEY ("id_type_vehicule") REFERENCES "type_vehicule"("id_type_vehicule") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarif" ADD CONSTRAINT "tarif_id_formule_fkey" FOREIGN KEY ("id_formule") REFERENCES "formule"("id_formule") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inclure" ADD CONSTRAINT "inclure_id_formule_fkey" FOREIGN KEY ("id_formule") REFERENCES "formule"("id_formule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inclure" ADD CONSTRAINT "inclure_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "service"("id_service") ON DELETE RESTRICT ON UPDATE CASCADE;
