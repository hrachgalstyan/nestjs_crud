import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  validateSync,
} from 'class-validator';

import { NodeEnvEnum } from '@Enums';

class EnvironmentVariables {
  @IsEnum(NodeEnvEnum)
  NODE_ENV: NodeEnvEnum;

  @IsNumber()
  PORT: number;

  @IsString()
  @Matches(/^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(\:[0-9]{2,5})?$/, {
    message: 'Origin must be a valid URL',
  })
  ORIGIN: string;

  @IsString()
  DATABASE_DEV_HOST: string;

  @IsNumber()
  DATABASE_DEV_PORT: number;

  @IsString()
  DATABASE_DEV_USERNAME: string;

  @IsString()
  DATABASE_DEV_PASSWORD: string;

  @IsString()
  DATABASE_DEV_NAME: string;

  @IsString()
  @IsOptional()
  DATABASE_DEV_LOGGING: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    validationError: { target: false },
  });

  if (errors.length > 0) {
    throw new BadRequestException(
      `Not all environment variables are set correctly: ${errors.toString()}`,
    );
  }

  return validatedConfig;
}
