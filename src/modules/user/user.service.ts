import { Injectable, NotFoundException } from '@nestjs/common';

import { UserEntity } from '@models/user.entity';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async getUserDetail(userId: number): Promise<UserEntity> {
    const result = await this.usersRepository.getUserDetail(userId);
    if (!result) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return result;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException({
        error: {
          code: 'User not found',
          message: 'Email not exist in system',
        },
      });
    }
    return user;
  }
}
