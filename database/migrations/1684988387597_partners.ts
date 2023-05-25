import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'partners'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().index()
      table.text('address')
      table.string('country_code', 2).references('code').inTable('countries')
      table.string('phone')
      table.text('email')
      table.boolean('is_supplier').defaultTo(false)
      table.boolean('is_customer').defaultTo(false)
      table.integer('company_id').unsigned().references('id').inTable('partners')
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
