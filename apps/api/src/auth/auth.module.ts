import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';
import { PasswordService } from './password.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_REFRESH_SERVICE } from './auth.constants';


const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is required');
}
if (!jwtRefreshSecret) {
  throw new Error('JWT_REFRESH_SECRET is required');
}

@Module({
  imports: [UtilisateursModule, JwtModule.register({
    global: true,
    secret: jwtSecret,
    signOptions: { expiresIn: '15m' },
  })],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    {
      provide: JWT_REFRESH_SERVICE,
      useFactory: () => new JwtService({
        secret: jwtRefreshSecret,
        signOptions: { expiresIn: '7d' },
      }),
    },
  ],
})
export class AuthModule { }
