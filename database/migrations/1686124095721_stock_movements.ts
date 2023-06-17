import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stock_movements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('source_document_id').unsigned()
      table.string('source_document_type').unsigned()
      table.integer('stock_picking_id').unsigned().notNullable()
      table.integer('item_id').unsigned().notNullable()
      table.integer('location_src_id').unsigned().nullable()
      table.integer('location_dest_id').unsigned().nullable()
      table.float('quantity').defaultTo(0)
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
