import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailService } from '@modules/mail/mail.service';

import { TokenModule } from '../token/token.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), TokenModule],
  providers: [ConfigService, UserService, MailService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
