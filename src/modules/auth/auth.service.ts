import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

import { EUserForgetPassword } from '@constants/api.userforgotpassword.constant';
import { EEnvType } from '@constants/env.type';

import { UserEntity } from '@models/user.entity';

import { IMailOptions } from '@modules/mail/mail-options.interface';
import { MailService } from '@modules/mail/mail.service';
import { UserRepository } from '@modules/user/user.repository';

import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { ForgetPasswordRepository } from './user-forget-password.repository';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private configService: ConfigService,
    private forgetPasswordRepository: ForgetPasswordRepository,
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    this.logger.debug(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    // compare password
    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    // payload
    const payload = {
      sub: user.id,
      fullname: user.fullname,
    };
    const accessToken = this.tokenService.signJwt(payload);
    const refreshToken = this.tokenService.signJwt(payload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  async hashPassword(password: string) {
    const saltRounds =
      this.configService.get<number>('BCRYPT_SALT_ROUNDS') || 14;
    return await hash(password, saltRounds);
  }

  async generateToken(user: UserEntity): Promise<string> {
    const payload = { id: user.id, sub: user.fullname };
    return this.tokenService.signJwt(payload);
  }

  async getInfoByToken(token: string) {
    try {
      const payload = await this.tokenService.verifyJwt(token);
      return payload;
    } catch (error) {
      throw new BadRequestException({
        error: {
          code: 'token wrong',
          message: 'The token is wrong or expired',
        },
      });
    }
  }

  async sendLinkResetPassword(email: string) {
    const user = await this.userService.getUserByEmail(email);
    const token = await this.generateToken(user);
    // save record to db
    const record = this.forgetPasswordRepository.create({
      userId: user.id,
      token: token,
      status: EUserForgetPassword.STATUS_PROCESSING,
      user: user,
    });
    await this.forgetPasswordRepository.save(record);

    // send mail with url forgot password
    const APP_URL = this.configService.get<string>(EEnvType.APP_URL);
    const mailOptions: IMailOptions = {
      from: this.configService.get<string>(EEnvType.MAIL_FROM),
      to: email,
      subject: 'Reset Password',
      html: this.mailService.createTemplateMailHtml(
        `${APP_URL}auth/reset-password/${token}`,
      ),
    };
    await this.mailService.sendMail(mailOptions);

    return {
      success: true,
      message: 'Success',
    };
  }

  async getResetPassword(token) {
    const payload = await this.getInfoByToken(token);
    const userId = payload.id;
    const user = await this.userService.getUserDetail(userId);
    const record = await this.forgetPasswordRepository.findRecordByToken(token);
    if (!record) {
      throw new BadRequestException({
        error: {
          code: 'token wrong',
          message: 'The token is wrong or expired',
        },
      });
    }
    if (user && record.status === EUserForgetPassword.STATUS_PROCESSING) {
      return {
        success: true,
        message: 'Success',
        data: {
          userId: user.id,
        },
      };
    } else {
      throw new ForbiddenException({
        error: {
          code: 'OneTokenOneTimeUsed',
          message: 'The Token be used before',
        },
      });
    }
  }

  async resetPassword(token: string, newPassword: string) {
    // get record in db
    const record = await this.forgetPasswordRepository.findRecordByToken(token);
    if (!record) {
      throw new BadRequestException({
        error: {
          code: 'token wrong',
          message: 'The token is wrong or expired',
        },
      });
    }
    const statusChangePass = record.status;
    // get user from token
    const user = record.user;

    if (statusChangePass === EUserForgetPassword.STATUS_PROCESSING) {
      const newPass = await this.hashPassword(newPassword);
      user.password = newPass;
      this.userRepository.save(user);
      record.status = EUserForgetPassword.STATUS_COMPLETED;
      this.forgetPasswordRepository.save(record);
      return {
        success: true,
        message: 'Change password successfully',
      };
    } else {
      throw new ForbiddenException({
        error: {
          code: 'OneTokenOneTimeUsed',
          message: 'The Token be used before',
        },
      });
    }
  }
}
