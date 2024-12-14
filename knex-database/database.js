const knex = require("knex")

const config = require("./knexfile")

const environment = process.env.NODE_ENV === "development" ? config.development : config.production

const db = knex(environment)

module.exports = db
