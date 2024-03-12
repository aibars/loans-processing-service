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
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApiOkResponse({
    description: 'The saved entity',
  })
  @ApiOperation({
    summary: 'Saves an application',
  })
  @Post()
  @HttpCode(200)
  async submitApplication(
    @Req() request,
    @Body() body: ApplicationDto,
  ): Promise<ApplicationModel> {
    body.createdBy = request.user.id;
    return await this.applicationsService.submitApplication(body);
  }

  @ApiOkResponse({
    description: 'A list of all the applications',
  })
  @ApiOperation({
    summary:
      'Admin role only. Obtains all the applications that are saved in the system',
  })
  @Get()
  @HttpCode(200)
  @Roles('Admin')
  @UseGuards(RolesGuard)
  async getAll(): Promise<ApplicationModel[]> {
    return await this.applicationsService.find();
  }

  @ApiOkResponse({
    description: 'The found application',
  })
  @ApiOperation({
    summary: 'Obtains an application by its id',
  })
  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id') id: string): Promise<ApplicationModel> {
    const results = await this.applicationsService.find(id);

    if (results?.length) return results[0];
    throw new BadRequestException(`No elements where found with Id = ${id}`);
  }
}
