import * as dotenv from 'dotenv';

import databaseConfig from '@Database/database.config';

dotenv.config();

module.exports = databaseConfig()[process.env.NODE_ENV || 'development'];
