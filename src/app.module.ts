import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/user';
import { Role } from './typeorm/entities/role';
import { ApplicationsController } from './applications/applications.controller';
import { ApplicationsService } from './applications/applications.service';
import { ApplicationsModule } from './applications/applications.module';
import { Application } from './typeorm/entities/application';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.valueFor(ConfigService.ConfigVar.postgresHost),
        port: +configService.valueFor(ConfigService.ConfigVar.postgresPort),
        username: configService.valueFor(ConfigService.ConfigVar.postgresUser),
        password: configService.valueFor(
          ConfigService.ConfigVar.postgresPassword,
        ),
        database: configService.valueFor(
          ConfigService.ConfigVar.postgresDatabase,
        ),
        entities: [__dirname + '/typeorm/entities/**/*{.js,.ts}'],
        synchronize: false,
        migrationsRun: true,
        migrationsTableName: 'migrations',
        migrations: [__dirname + '/typeorm/migrations/**/*{.js,.ts}'],
        cli: {
          migrationsDir: __dirname + '/typeorm/migrations',
        },
        ssl: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Role, Application]),
    ApplicationsModule,
    UsersModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class AppModule {}
