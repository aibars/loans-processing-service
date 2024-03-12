import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyApplication1710202498065 implements MigrationInterface {
    name = 'ModifyApplication1710202498065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "createdBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_08559c158479eab0946a0085c21" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_08559c158479eab0946a0085c21"`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "createdBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "status"`);
    }

}
