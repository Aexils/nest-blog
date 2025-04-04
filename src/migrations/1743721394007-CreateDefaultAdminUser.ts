import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class CreateDefaultAdminUser1743721394007 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPassword = await bcrypt.hash('admin', 10);

        await queryRunner.query(`
            INSERT INTO "users"
            ("id", "email", "name", "password", "isPasswordResetRequired", "createdAt", "updatedAt")
            VALUES (
                       uuid_generate_v4(),
                       'alexis.levasseur.76@gmail.com',
                       'Alexis',
                       '${hashedPassword}',
                       true,
                       now(),
                       now()
                   )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "users" WHERE "email" = 'alexis.levasseur.76@gmail.com'
        `);
    }
}
