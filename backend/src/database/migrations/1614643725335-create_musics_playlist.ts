import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createMusicsPlaylist1614643725335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'musicsPlaylist',
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
                    name: 'playlistId',
                    type: 'varchar'
                },
                {
                    name: 'musicId',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'playlistForeign',
                    columnNames: [ 'playlistId'],
                    referencedTableName: 'playlists',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'musicForeign',
                    columnNames: [ 'musicId'],
                    referencedTableName: 'musics',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
