import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPlaylistCover1614388902416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'playlistsCover',
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
                    name: 'playlist_id',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'PlaylistCover',
                    columnNames: ['playlist_id'],
                    referencedTableName: 'playlists',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('playlistsCover');
    }

}
