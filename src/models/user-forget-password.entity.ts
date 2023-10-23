import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'user_forget_password' })
export class UserForgetPasswordEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'user_id', type: 'int' })
  public userId: number;

  @Column({ type: 'varchar', length: 300 })
  public token: string;

  @Column({ type: 'int', default: 1 })
  public status: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  public updatedAt: string;

  @ManyToOne(() => UserEntity, user => user.userForgetPasswords)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
