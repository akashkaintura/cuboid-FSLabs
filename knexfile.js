const { knexSnakeCaseMappers } = require('objection');
const config = require('./src/config');

const defaultKnexConfig = {
  client: 'sqlite3',
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/knex/migrations',
  },
  seeds: {
    directory: __dirname + '/knex/seeds',
  },
  ...knexSnakeCaseMappers(),
  useNullAsDefault: true,
};

module.exports = {
  development: {
    ...defaultKnexConfig,
    connection: { filename: config.dbFilename },
    knexDebug: config.knexDebug,
  },
  test: {
    ...defaultKnexConfig,
    connection: { filename: config.dbTestFilename },
  },
};
