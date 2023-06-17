import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stock_pickings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('source_document_id')
      table.string('source_document_type')
      table.integer('source_location_id').unsigned().notNullable()
      table.integer('destination_location_id').unsigned().notNullable()
      table
        .enum('operation_type', ['internal', 'incoming', 'outgoing'], {
          useNative: true,
          enumName: 'operation_type',
          existingType: false,
        })
        .notNullable()

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
