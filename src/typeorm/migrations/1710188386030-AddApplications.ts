import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApplications1710188386030 implements MigrationInterface {
    name = 'AddApplications1710188386030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdBy" uuid NOT NULL, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "applications"`);
    }

}
