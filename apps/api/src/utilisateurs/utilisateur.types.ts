import { Prisma } from "@prisma/client";

export type UtilisateurPublic = Prisma.UtilisateurGetPayload<{
    omit: { passwordHash: true };
}>;