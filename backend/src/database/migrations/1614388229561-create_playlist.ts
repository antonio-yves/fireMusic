import {IsNull, MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPlaylist1614388229561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'playlists',
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
                    name: 'playlistName',
                    type: 'varchar',
                },
                {
                    name: 'playlistDescription',
                    type: 'varchar',
                },
                {
                    name: 'isPublic',
                    type: 'boolean',
                },
                {
                    name: 'creationDate',
                    type: 'date',
                },
                {
                    name: 'userId',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'userPlaylist',
                    columnNames: ['userId'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('playlists');
    }

}
