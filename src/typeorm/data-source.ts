import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'loans',
  entities: ['src/typeorm/entities/**/*{.js,.ts}'],
  migrationsTableName: 'migrations',
  migrations: ['src/typeorm/migrations/**/*{.js,.ts}'],
  ssl: false,
});
