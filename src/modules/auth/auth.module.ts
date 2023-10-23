import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailService } from '@modules/mail/mail.service';

import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ForgetPasswordRepository } from './user-forget-password.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ForgetPasswordRepository]),
    ConfigModule,
    TokenModule,
    UserModule,
  ],
  exports: [AuthService],
  providers: [AuthService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
