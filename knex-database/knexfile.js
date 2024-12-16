// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require("dotenv").config()

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: process.env.DEV_DATABASE_USERNAME,
      password: process.env.DEV_DATABASE_PASSWORD,
      database: process.env.DEV_DATABASE_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: true
    // seeds: {
    //   directory: './seeds'
    // }
  },
  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: process.env.PROD_DATABASE_USERNAME,
      password: process.env.PROD_DATABASE_PASSWORD,
      database: process.env.PROD_DATABASE_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    // seeds: {
    //   directory: './seeds'
    // }
    debug: true
  }
};