const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  dbFilename: process.env.DB_FILENAME,
  dbTestFilename: process.env.DB_TEST_FILENAME,
  knexDebug: process.env.KNEX_DEBUG === 'true',
  port: process.env.APP_PORT || 5000,
  defaultPage: 0,
  defaultPageSize: 10,
};
