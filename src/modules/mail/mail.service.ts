import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

import { EEnvType } from '@constants/env.type';

@Injectable()
export class MailService {
  readonly logger = new Logger(MailService.name);

  private transporter: Transporter;
  constructor(configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get<string>(EEnvType.SMTP_HOST),
      port: configService.get<number>(EEnvType.SMTP_PORT),
      secure: configService.get<boolean>(EEnvType.SMTP_SECURE),
      auth: {
        user: configService.get<string>(EEnvType.SMTP_USER),
        pass: configService.get<string>(EEnvType.SMTP_PASS),
      },
    });
  }

  /**
   * sendmail
   * @param mailoptions
   * @returns
   */
  async sendMail(mailoptions: MailOptions): Promise<any> {
    try {
      this.logger.debug('sendmail');
      const result = await this.transporter.sendMail(mailoptions);
      this.logger.debug('sendmail result', result);
      return result;
    } catch (error) {
      this.logger.error('Sendmail error', error);
      throw error;
    }
  }

  createTemplateMailHtml(urlResetPassword: string): string {
    return `<h2>Reset Password Link</h2>
    <p>To reset your password, visit the following link:</p>
    ${urlResetPassword}
    <p>If you did not make this request then simply ignore this email and no changes will be made.</p>`;
  }
}
