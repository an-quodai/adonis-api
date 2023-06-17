import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  computed,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import SaleOrder from './SaleOrder'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import SaleOrderLineFilter from './Filters/SaleOrderLineFilter'
import Item from './Item'
import ProductionOrder from './ProductionOrder'

export default class SaleOrderLine extends compose(BaseModel, Filterable) {
  public static $filter = () => SaleOrderLineFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public saleOrderId: number

  @column()
  public itemId: number

  @belongsTo(() => Item)
  public item: BelongsTo<typeof Item>

  @column()
  public quantity: number = 0

  @column()
  public unitPrice: number = 0

  @computed()
  public get subtotal(): number {
    return this.unitPrice * this.quantity
  }

  @belongsTo(() => SaleOrder)
  public saleOrder: BelongsTo<typeof SaleOrder>

  @hasMany(() => ProductionOrder, {
    foreignKey: 'saleOrderLineId',
  })
  public productionOrders: HasMany<typeof ProductionOrder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
