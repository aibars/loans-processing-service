import * as dotenv from 'dotenv';
import { Inject, Injectable } from '@nestjs/common';
import { PROCESS_ENV } from './config.types';
dotenv.config();

@Injectable()
export class ConfigService {
  constructor(@Inject(PROCESS_ENV) private readonly env: NodeJS.ProcessEnv) {}

  public isDevelopment(): boolean {
    return this.valueFor(ConfigService.ConfigVar.appEnv, '') === 'development';
  }

  public isProduction(): boolean {
    return this.valueFor(ConfigService.ConfigVar.appEnv, '') === 'production';
  }

  public valueFor(
    configVar: ConfigService.ConfigVar,
    defaultValue?: string,
  ): string {
    const value = this.env[configVar];

    if (value) {
      return value;
    }

    return defaultValue || '';
  }
}

// istanbul ignore next
/* eslint-disable @typescript-eslint/no-namespace */
// tslint:disable:no-namespace
export namespace ConfigService {
  export enum ConfigVar {
    appEnv = 'APP_ENV',
    postgresDatabase = 'POSTGRES_DATABASE',
    postgresHost = 'POSTGRES_HOST',
    postgresPassword = 'POSTGRES_PASSWORD',
    postgresPort = 'POSTGRES_PORT',
    postgresUser = 'POSTGRES_USER',
  }
}
