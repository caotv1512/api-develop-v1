import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserEntity } from '@models/user.entity';

import { UserService } from './user.service';

@ApiTags('Users')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.getUserDetail(id);
  }
}
