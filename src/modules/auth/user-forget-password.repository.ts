import { EntityRepository, Repository } from 'typeorm';

import { UserForgetPasswordEntity } from '@models/user-forget-password.entity';

@EntityRepository(UserForgetPasswordEntity)
export class ForgetPasswordRepository extends Repository<UserForgetPasswordEntity> {
  async findRecordByToken(token: string) {
    const record = await this.findOne({
      where: { token: token },
      relations: ['user'],
    });
    return record;
  }
}
