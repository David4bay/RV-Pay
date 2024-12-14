const knex = require("knex")

const config = require("./knexfile")
// installed cross-env to programmatically pick the environment we run node at
const environment = process.env.NODE_ENV === "development" ? config.development : config.production
// load up the environment in our db
const db = knex(environment)

module.exports = db
