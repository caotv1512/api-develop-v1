import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { EEnvType } from '../../constants/env.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return Object.assign(await getConnectionOptions(), {
          type: 'postgres',
          host: configService.get(EEnvType.DB_HOST),
          port: configService.get(EEnvType.DB_PORT),
          username: configService.get(EEnvType.DB_USERNAME),
          password: configService.get(EEnvType.DB_PASSWORD),
          database: configService.get(EEnvType.DB_NAME),
          logging: process.env.NODE_ENV === 'development',
        });
      },
    }),
  ],
})
export class PostgresModule {}
