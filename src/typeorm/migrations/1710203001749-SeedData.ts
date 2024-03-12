import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1710203001749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sql = `
        --ROLES
        INSERT INTO public.roles (id, "name") VALUES(1, 'Admin');
        INSERT INTO public.roles (id, "name") VALUES(2, 'Applicant');

        --USERS
        INSERT INTO public.users (id, username, "password", "roleId") VALUES(uuid_generate_v4(), 'agustin.ibars@gmail.com', '123', 1);
        INSERT INTO public.users (id, username, "password", "roleId") VALUES(uuid_generate_v4(), 'ibars_2@gmail.com', '123', 2);


        -- APPLICATIONS
        DO $$ 
        DECLARE
          user_id uuid;
        BEGIN
          -- Assign the result of the SELECT query to the variable
          SELECT "id" INTO user_id
          FROM users
          WHERE username = 'agustin.ibars@gmail.com'; 
        
              INSERT INTO applications
        (id, "name", "createdAt", "createdBy", status)
        VALUES(uuid_generate_v4(), 'Application 9', '2024-03-19', user_id, 'Rejected');
        
        INSERT INTO public.applications
        (id, "name", "createdAt", "createdBy", status)
        VALUES(uuid_generate_v4(), 'Application 2', '2024-03-12', user_id, 'Approved');

        INSERT INTO public.applications
            (id, "name", "createdAt", "createdBy", status)
            VALUES(uuid_generate_v4(), 'Application 1', '2024-03-11', user_id, 'Pending');


        INSERT INTO public.applications
        (id, "name", "createdAt", "createdBy", status)
        VALUES(uuid_generate_v4(), 'Application 3', '2024-03-13', user_id, 'Rejected');
                END $$;
        `;

    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
