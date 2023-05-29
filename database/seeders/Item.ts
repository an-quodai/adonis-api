import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Item from 'App/Models/Item'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public async run() {
    const items: object[] = []
    for (let i = 0; i < 100; i++) {
      items.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        cost: faker.commerce.price(),
        uomId: 1,
        purchaseUomId: 1,
      })
    }
    // Write your database queries inside the run method
    await Item.createMany(items)
  }
}
