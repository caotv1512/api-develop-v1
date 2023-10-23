import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripeClient: Stripe;
  logger = new Logger(StripeService.name);

  constructor(configService: ConfigService) {
    this.stripeClient = new Stripe(
      configService.get<string>('STRIPE_API_KEY'),
      {
        apiVersion: '2020-08-27',
      },
    );
  }
}
