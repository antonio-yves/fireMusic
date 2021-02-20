import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class albumCover1613780793566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'albumCover',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'album_id',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'AlbumCover',
                    columnNames: ['album_id'],
                    referencedTableName: 'albuns',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('albumCover');
    }

}
