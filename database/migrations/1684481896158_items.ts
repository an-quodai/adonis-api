import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().index()
      table.decimal('price')
      table.decimal('cost')
      table.jsonb('properties')
      table.string('category')
      table.enum('type', ['product', 'service', 'material', 'mould'], {
        useNative: true,
        enumName: 'item_type',
        existingType: false,
      })
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS item_type')
    this.schema.dropTable(this.tableName)
  }
}
