import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import config from '@Database/database.config';
import { Category, Product } from '@Models';

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
