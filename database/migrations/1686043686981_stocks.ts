import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stocks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('stock_location_id').unsigned().notNullable()
      table.integer('item_id').unsigned().notNullable()
      table.float('reserved').defaultTo(0)
      table.float('available').defaultTo(0)
      table.float('incoming').defaultTo(0)
      table.float('unit_cost').defaultTo(0)
      table.float('total_cost').defaultTo(0)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
