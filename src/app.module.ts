import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration/configuration.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { MODULES } from './modules';

@Module({
  imports: [ConfigurationModule, PostgresModule, ...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
