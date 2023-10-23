import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import {
  ResetPasswordDto,
  UserForgetPasswordDto,
} from '@modules/user/dtos/user-forget-password.dto';

import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDto): Promise<any> {
    return await this.authService.login(data.email, data.password);
  }

  @Post('/forget-password')
  async forgetPassword(@Body() userForgetPasswordDto: UserForgetPasswordDto) {
    return this.authService.sendLinkResetPassword(userForgetPasswordDto.email);
  }

  @Get('/reset-password/:token')
  async getResetPassword(@Param('token') token: string) {
    return this.authService.getResetPassword(token);
  }

  @Post('/reset-password/:token')
  async postResetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    if (resetPasswordDto.newPassword === resetPasswordDto.confirmPassword) {
      return this.authService.resetPassword(
        token,
        resetPasswordDto.newPassword,
      );
    } else {
      return {
        error: {
          code: 'wrong credential',
          message: 'Password and Resetpassword are not equal',
        },
      };
    }
  }
}
