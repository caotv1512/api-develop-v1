import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1625018505850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            width: 11,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'char',
            length: '60',
            isNullable: false,
          },
          {
            name: 'fullname',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'birthday',
            type: 'date',
          },
          {
            name: 'registration_number',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'office_name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'zip_code',
            type: 'int',
          },
          {
            name: 'prefecture',
            type: 'int',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'address2',
            type: 'varchar',
            length: '1000',
            isNullable: true,
          },
          {
            name: 'certificate',
            type: 'varchar',
            length: '1000',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            length: '1000',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int',
            default: '1',
          },
          {
            name: 'deleted',
            type: 'boolean',
          },
          {
            name: 'stripe_customer_id',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('users');
  }
}
