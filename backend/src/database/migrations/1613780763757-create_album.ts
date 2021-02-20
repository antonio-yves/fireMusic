import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAlbum1613780763757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'albuns',
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
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'copyright',
                    type: 'string',
                },
                {
                    name: 'generos',
                    type: 'string',
                },
                {
                    name: 'isComplete',
                    type: 'boolean',
                },
                {
                    name: 'isSingle',
                    type: 'boolean',
                },
                {
                    name: 'gravadora',
                    type: 'string',
                },
                {
                    name: 'lancamento',
                    type: 'date',
                },
                {
                    name: 'trackNumber',
                    type: 'integer',
                },
                {
                    name: 'artist',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'artistId',
                    columnNames: ['artist'],
                    referencedTableName: 'artists',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]    
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('albuns');
    }

}
