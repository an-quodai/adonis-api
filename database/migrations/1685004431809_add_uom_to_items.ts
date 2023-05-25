import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('uom_id').unsigned().references('id').inTable('uoms')
      table.integer('purchase_uom_id').unsigned().references('id').inTable('uoms')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('uom_id')
      table.dropColumn('purchase_uom_id')
    })
  }
}
