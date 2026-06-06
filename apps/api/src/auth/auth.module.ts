import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';
import { PasswordService } from './password.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';

@Module({
  imports: [UtilisateursModule, JwtModule.register({
    global: true,
    secret: process.env.NEXTAUTH_SECRET,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthController],
  providers: [AuthService, PasswordService]
})
export class AuthModule { }
