import { SequelizeOptions } from 'sequelize-typescript';

import { NodeEnvEnum } from '@Enums';

export type DatabaseConfig = {
  [key in NodeEnvEnum]: SequelizeOptions;
};

export default (): DatabaseConfig => ({
  development: {
    dialect: 'mysql',
    host: process.env.DATABASE_DEV_HOST,
    port: parseInt(process.env.DATABASE_DEV_PORT, 10) || 3306,
    username: process.env.DATABASE_DEV_USERNAME,
    password: process.env.DATABASE_DEV_PASSWORD,
    database: process.env.DATABASE_DEV_NAME,
    logging: process.env.DATABASE_DEV_LOGGING === 'true',
  },
  test: {
    dialect: 'mysql',
    host: process.env.DATABASE_TEST_HOST,
    port: parseInt(process.env.DATABASE_TEST_PORT, 10) || 3306,
    username: process.env.DATABASE_TEST_USERNAME,
    password: process.env.DATABASE_TEST_PASSWORD,
    database: process.env.DATABASE_TEST_NAME,
    logging: process.env.DATABASE_TEST_LOGGING === 'true',
  },
  production: {
    dialect: 'mysql',
    host: process.env.DATABASE_PROD_HOST,
    port: parseInt(process.env.DATABASE_PROD_PORT, 10) || 3306,
    username: process.env.DATABASE_PROD_USERNAME,
    password: process.env.DATABASE_PROD_PASSWORD,
    database: process.env.DATABASE_PROD_NAME,
    logging: process.env.DATABASE_PROD_LOGGING === 'true',
  },
});
