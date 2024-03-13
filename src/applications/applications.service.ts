import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApplicationDto, ApplicationModel } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/typeorm/entities/application';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/user';

/**
 * Methods related to applications processing
 */
@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Creates an application entity and persists it into the database
   * @param model the object with the application definition
   * @returns the saved object
   */
  public async submitApplication(
    model: ApplicationDto,
  ): Promise<ApplicationModel> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: model.createdBy },
      });

      if (!user)
        throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);

      const record = {
        ...model,
        createdAt: new Date(),
        status: 'Pending',
        createdBy: user,
      };

      const savedEntity = await this.applicationRepository.save(record);

      return {
        name: savedEntity.name,
        status: savedEntity.status,
        id: savedEntity.id,
        createdAt: savedEntity.createdAt,
        createdBy: savedEntity.createdBy.username,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Returns either all applications or one by id
   * @param id The uuid of the application
   * @returns an array of applications, or one if an id is provided
   */
  public async find(id: string = null): Promise<ApplicationModel[]> {
    try {
      const options = { relations: ['createdBy'] };
      const applications = await this.applicationRepository.find(
        id
          ? {
              where: { id },
              ...options,
            }
          : options,
      );

      return applications.map((a) => ({
        name: a.name,
        status: a.status,
        id: a.id,
        createdAt: a.createdAt,
        createdBy: a.createdBy.username,
      }));
    } catch (err) {
      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }
  }
}
