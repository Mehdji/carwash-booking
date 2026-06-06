import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';
import { PasswordService } from './password.service';

@Module({
  imports: [UtilisateursModule],
  controllers: [AuthController],
  providers: [AuthService, PasswordService]
})
export class AuthModule { }
