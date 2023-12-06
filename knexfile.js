require('dotenv').config();
const { config } = require('./src/configs/ConfiDB')
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql2',
    connection: config,
    migrations: {
        tableName: process.env.MIGRATION_DB,
        directory: process.env.MIGRATION_DIR
    },
    seeds: {
        directory: process.env.SEEDS_DIR
    },
    pool: {
        min: Number(process.env.DB_POOL_MIN),
        max: Number(process.env.DB_POOL_MAX)
    },
    acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
};
