import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'production_orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('sale_order_id').unsigned().references('sale_orders.id').onDelete('RESTRICT')
      table.integer('item_id').unsigned().references('items.id').onDelete('RESTRICT')
      table
        .integer('sale_order_line_id')
        .unsigned()
        .references('sale_order_lines.id')
        .onDelete('RESTRICT')
      table.float('quantity').defaultTo(0)
      table.date('deadline')
      table.float('finished_quantity').defaultTo(0)
      table.string('status')

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
