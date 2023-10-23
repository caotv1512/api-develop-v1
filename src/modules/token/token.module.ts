import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (jwtConfig: ConfigService) => {
        return {
          secret: jwtConfig.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  exports: [TokenService],
  providers: [TokenService],
})
export class TokenModule {}
