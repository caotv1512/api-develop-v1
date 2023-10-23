import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserForgetPasswordEntity } from './user-forget-password.entity';

@Entity({ name: 'users' })
export class UserEntity {
  //id
  @PrimaryGeneratedColumn()
  public id: number;
  //email
  @Column({ type: 'varchar', length: 255 })
  public email: string;

  //password
  @Column({ type: 'char', length: 60, select: false })
  public password: string;

  //fullname
  @Column({ type: 'varchar', length: 255 })
  public fullname: string;

  //birhday
  @Column('date')
  public birthday: string;

  //registration_number登録番号
  @Column({ name: 'registration_number', type: 'varchar', length: 255 })
  public registrationNumber: string;

  //office_name事務所名
  @Column({ name: 'office_name', type: 'varchar', length: 255 })
  public officeName: string;

  //zip_code郵便番号
  @Column({ name: 'zip_code', type: 'int' })
  public zipCode: number;

  //prefecture事務所所在地（都道府県）
  @Column('int')
  public prefecture: number;

  //city
  @Column({ type: 'varchar', length: 255 })
  public city: string;

  //address_1事務所所在地（その他の住所）
  @Column({ type: 'varchar', length: 10000, nullable: true })
  public address2: string;

  //certificate
  @Column({ type: 'varchar', length: 1000, nullable: true })
  public certificate: string;

  //avatar
  @Column({ type: 'varchar', length: 1000, nullable: true })
  public avatar: string;

  //status
  @Column({
    type: 'int',
    default: 1,
  })
  public status: number;

  //deleted
  @Column({ type: 'boolean' })
  public deleted: boolean;

  //stripe_customer_id
  @Column({ name: 'stripe_customer_id', type: 'varchar', length: 255 })
  public stripeCustomerId: string;

  //created_at
  @Column({ name: 'created_at', type: 'timestamp' })
  public createdAt: string;

  //updated_at
  @Column({ name: 'updated_at', type: 'timestamp' })
  public updatedAt: string;

  //deleted_at
  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  public deletedAt: string;

  @OneToMany(
    () => UserForgetPasswordEntity,
    userForgetPassword => userForgetPassword.user,
  )
  userForgetPasswords: UserForgetPasswordEntity[];
}
