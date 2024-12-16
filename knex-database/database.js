const knex = require("knex")

const config = require("./knexfile")
// installed cross-env to programmatically pick the environment we run node at
const environment = process.env.NODE_ENV === "development" ? config.development : config.production
// load up the environment in our db
console.log(
    "DATABASE_USERNAME", process.env.DEV_DATABASE_USERNAME,
    "DATABASE_PASSWORD", process.env.DEV_DATABASE_PASSWORD,
    "DATABASE_NAME", process.env.DEV_DATABASE_NAME
)
const db = knex(environment)

module.exports = db