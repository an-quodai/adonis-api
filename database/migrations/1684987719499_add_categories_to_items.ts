import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('items', (table) => {
      table.dropColumn('category')
      table.integer('category_id').unsigned().references('id').inTable('categories')
    })
  }

  public async down() {
    this.schema.alterTable('items', (table) => {
      table.dropColumn('category_id')
      table.string('category')
    })
  }
}
