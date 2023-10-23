import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from '../../models/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  /**
   *
   * @param userId
   * @returns
   */
  async getUserDetail(userId: number): Promise<UserEntity> {
    return await this.findOne({
      where: { deleted: false, status: 1, id: userId },
    });
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({
      select: ['id', 'email', 'fullname', 'password'],
      where: { deleted: false, status: 1, email: email },
    });
  }
}
