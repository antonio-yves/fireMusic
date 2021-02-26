import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createMusic1614296015410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'musics',
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
                    name: 'musicName',
                    type: 'varchar'
                },
                {
                    name: 'composer',
                    type: 'varchar',
                },
                {
                    name: 'musicDuration',
                    type: 'integer',
                },
                {
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'trackNumber',
                    type: 'integer',
                },
                {
                    name: 'albumId',
                    type: 'varchar',
                },
                
            ],
            foreignKeys: [
                {
                    name: 'albumMusic',
                    columnNames: ['albumId'],
                    referencedTableName: 'albuns',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('musics');
    }

}
