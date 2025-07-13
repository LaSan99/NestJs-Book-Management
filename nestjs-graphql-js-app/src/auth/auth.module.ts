import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret-key', // In production, use environment variable
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthResolver], // Providers are the classes that can be injected into other classes
  exports: [AuthService], // What parts of this module are shared with others
})
export class AuthModule {} 