import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationDto, ApplicationModel } from './types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  /**
   * Saves an application
   */
  @Post()
  @HttpCode(200)
  async submitApplication(
    @Req() request,
    @Body() body: ApplicationDto,
  ): Promise<ApplicationModel> {
    body.createdBy = request.user.id;
    return await this.applicationsService.submitApplication(body);
  }

  /**
   * [ADMIN ONLY] Returns all the saved applications
   */
  @Get()
  @HttpCode(200)
  @Roles('Admin')
  @UseGuards(RolesGuard)
  async getAll(): Promise<ApplicationModel[]> {
    return await this.applicationsService.find();
  }

  /**
   * Returns a specific application
   */
  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id') id: string): Promise<ApplicationModel> {
    const results = await this.applicationsService.find(id);

    if (results?.length) return results[0];
    throw new BadRequestException(`No elements where found with Id = ${id}`);
  }
}
