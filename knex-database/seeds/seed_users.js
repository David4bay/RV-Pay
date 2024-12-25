/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    { email: 'example@example.com', password: '343484598fjd'},
    { email: 'example2@example.com', password: 'dfdfj4j94jrrmr4k4'},
    { email: 'example3@example.com', password: 'dfdf9rer9f9eu9jf'}
  ]);
};
