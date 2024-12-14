const generateId = require("../../controllers/utils/generateId");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("account", function(table) {
    table.uuid("id").primary().defaultTo(generateId()) // generate unique id
    // could be number but its better as a string so there's no overflow issue if we limit it.
    table.string("account_number").unique().notNullable()
    // so we could have change show up in smaller denominations
    table.decimal("balance", 10, 2).defaultTo(0)
    // we can show the user account creation and update, could also add birthday 
    // or use date.now to gauge events between creation of account
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
// check if the table exists before dropping
  return knex.schema.dropTableIfExists("account")
};