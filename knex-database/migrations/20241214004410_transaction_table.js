const generateId = require("../../controllers/utils/generateId");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("transaction", function(table) {
      table.uuid("id").primary().defaultTo(generateId()) // generate unique id
      table.uuid("sender_id").references("account.id").notNullable() // sender_id must not be null
      table.uuid("receipient_id").references("account.id").notNullable() // receipient_id must not be null
      table.enum(["deposit", "transfer"]).notNullable() // type of deposit represented as enum
      table.enum(["successful", "pending", "failed", "reverted"]).notNullable() // status of transaction
      table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("transaction")
};
