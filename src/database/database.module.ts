import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Category, Product } from '@Models';

import config from './database.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => {
        const nodeEnv = process.env.NODE_ENV || 'development';
        const dbConfig = config()[nodeEnv];

        dbConfig.models = [Product, Category];

        return dbConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
