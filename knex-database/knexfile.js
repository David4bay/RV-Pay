// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
/*  IMPORTANT!!!
  Create a revpaydev database in mysql
*/
require("dotenv").config({
  path: "../.env"})
const path = require("path")

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: process.env.DEV_DATABASE_USERNAME,
      password: process.env.DEV_DATABASE_PASSWORD,
      database: process.env.DEV_DATABASE_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, "/migrations")
    },
    debug: true
    // seeds: {
    //   directory: './seeds'
    // }
  },
  production: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: process.env.PROD_DATABASE_USERNAME,
      password: process.env.PROD_DATABASE_PASSWORD,
      database: process.env.PROD_DATABASE_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, "/migrations")
    },
    // seeds: {
    //   directory: './seeds'
    // }
    debug: true
  }
};