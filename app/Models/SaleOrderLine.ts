import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import SaleOrder from './SaleOrder'

export default class SaleOrderLine extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public saleOrderId: number

  @column()
  public productId: number

  @column()
  public quantity: number = 0

  @column()
  public price: number = 0

  @computed()
  public get subtotal(): number {
    return this.price * this.quantity
  }

  @belongsTo(() => SaleOrder)
  public saleOrder: BelongsTo<typeof SaleOrder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
