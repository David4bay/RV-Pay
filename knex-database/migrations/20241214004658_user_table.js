const generateId = require("../../controllers/utils/generateId");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("user", function(table) {
      table.uuid("id").primary().defaultTo(generateId())
      table.string("email").unique().notNullable()
      table.string("password").notNullable()
      table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user")
};
