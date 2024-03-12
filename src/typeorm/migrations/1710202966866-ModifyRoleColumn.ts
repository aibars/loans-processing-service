import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRoleColumn1710202966866 implements MigrationInterface {
    name = 'ModifyRoleColumn1710202966866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
