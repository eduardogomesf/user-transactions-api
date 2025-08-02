import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTable1754155956116 implements MigrationInterface {
    name = 'AddUsersTable1754155956116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_type_enum" AS ENUM('storekeeper', 'common')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "full_name" character varying NOT NULL, "document" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "type" "public"."users_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c1b20b2a1883ed106c3e746c25a" UNIQUE ("document"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
    }

}
