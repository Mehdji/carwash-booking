import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';
import { PasswordService } from './password.service';
import { JwtModule } from '@nestjs/jwt';


const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is required');
}
@Module({
  imports: [UtilisateursModule, JwtModule.register({
    global: true,
    secret: jwtSecret,
    signOptions: { expiresIn: '15m' },
  })],
  controllers: [AuthController],
  providers: [AuthService, PasswordService]
})
export class AuthModule { }
