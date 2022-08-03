const tableName = 'events'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').unsigned().primary()
    t.string('name')
    t.text('description')
    t.string('owner')
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(tableName)
}
