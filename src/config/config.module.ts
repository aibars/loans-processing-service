import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { PROCESS_ENV } from './config.types';

/**
 * Configuration mappings from .env file to variables
 */
@Module({
  providers: [
    ConfigService,
    {
      provide: PROCESS_ENV,
      useValue: process.env,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
