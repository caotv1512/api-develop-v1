import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { EEnvType } from '../../constants/env.type';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: Joi.object({
        [EEnvType.NODE_ENV]: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        [EEnvType.PORT]: Joi.number().default(3000),
        // database
        [EEnvType.DB_HOST]: Joi.string().default('localhost'),
        [EEnvType.DB_PORT]: Joi.number().default(5432),
        [EEnvType.DB_USERNAME]: Joi.string().default('postgres'),
        [EEnvType.DB_PASSWORD]: Joi.string().default('postgres'),
        [EEnvType.DB_NAME]: Joi.string().default('postgres'),
        // Stripe
        [EEnvType.STRIPE_API_KEY]: Joi.string(),
        // Line
        [EEnvType.LINE_CHANNEL_ACCESS_TOKEN]: Joi.string(),
        [EEnvType.LINE_CHANNEL_SECRET]: Joi.string(),
        // AWS
        // JWT
        [EEnvType.JWT_SECRET_KEY]: Joi.string().default('secret-key-dev'),
        // BCRYPT
        [EEnvType.BCRYPT_SALT_ROUNDS]: Joi.number().default(10),
        // S3
        [EEnvType.S3_ACCESS_KEY]: Joi.string(),
        [EEnvType.S3_SECRET_KEY]: Joi.string(),
        [EEnvType.S3_BUCKET]: Joi.string(),
        [EEnvType.S3_REGION]: Joi.string(),
        [EEnvType.END_POINT_MEDIA]: Joi.string(),
        // SMTP
        [EEnvType.SMTP_HOST]: Joi.string(),
        [EEnvType.SMTP_PORT]: Joi.string(),
        [EEnvType.SMTP_SECURE]: Joi.boolean(),
        [EEnvType.SMTP_USER]: Joi.string(),
        [EEnvType.SMTP_PASS]: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigurationModule {}
