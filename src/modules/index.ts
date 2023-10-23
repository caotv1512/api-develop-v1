import { AuthModule } from './auth/auth.module';
import { LineModule } from './line/line.module';
import { MailModule } from './mail/mail.module';
import { StripeModule } from './stripe/stripe.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';

export const MODULES = [
  UserModule,
  StripeModule,
  LineModule,
  MailModule,
  AuthModule,
  TokenModule,
];
