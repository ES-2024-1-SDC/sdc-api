import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rides'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('driver_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
      table.integer('veichle_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('veichles')
      table.dateTime('date_time').notNullable()
      table.string('origin_lat').notNullable()
      table.string('origin_lng').notNullable()
      table.string('origin').notNullable()
      table.string('destination_lat').notNullable()
      table.string('destination_lng').notNullable()
      table.string('destination').notNullable()
      table.integer('max_passengers')
        .notNullable()
        .unsigned()
        .defaultTo(1)
      table.boolean('automatic_allowance')
        .notNullable()
        .defaultTo(false)
      table.enum('status', ['PENDING', 'IN_COURSE', 'CLOSED', 'CANCELLED'])
        .notNullable()
        .defaultTo('PENDING')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}