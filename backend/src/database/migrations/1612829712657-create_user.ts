import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createUser1612829712657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'string',
                },
                {
                    name: 'birthDate',
                    type: 'date',
                },
                {
                    name: 'country',
                    type: 'varchar', 
                },
                {
                    name: 'userName',
                    type: 'varchar',
                },
                {
                    name: 'isArtist',
                    type: 'boolean',
                    default: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
