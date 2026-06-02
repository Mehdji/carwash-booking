import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlotsController } from './slots/slots.controller';
import { PrismaModule } from './prisma/prisma.module';
//import { UtilisateursController } from './utilisateurs/utilisateurs.controller';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [PrismaModule, UtilisateursModule, AuthModule],
  controllers: [AppController, SlotsController],
  providers: [AppService],
})
export class AppModule { }
