import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stock_locations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table
        .enum('type', ['internal', 'external', 'scrap'], {
          useNative: true,
          enumName: 'location_type',
          existingType: false,
        })
        .notNullable()
      table.integer('parent_id').unsigned().nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS location_type')
    this.schema.dropTable(this.tableName)
  }
}
