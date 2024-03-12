import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/typeorm/entities/application';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/typeorm/entities/user';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Application, User]),
    HttpModule,
  ],
  providers: [ApplicationsService],
  controllers: [ApplicationsController],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
