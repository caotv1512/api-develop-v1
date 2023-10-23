import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule],
  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}
