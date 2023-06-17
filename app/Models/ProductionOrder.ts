import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import SaleOrder from './SaleOrder'
import Item from './Item'
import SaleOrderLine from './SaleOrderLine'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import ProductionOrderFilter from './Filters/ProductionOrderFilter'

export default class ProductionOrder extends compose(BaseModel, Filterable) {
  public static $filter = () => ProductionOrderFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public saleOrderId: number

  @column()
  public itemId: number

  @column()
  public saleOrderLineId: number

  @column()
  public quantity: number = 0

  @column()
  public deadline: Date

  @column()
  public finishedQuantity: number = 0

  @column()
  public status: string

  @belongsTo(() => SaleOrder)
  public saleOrder: BelongsTo<typeof SaleOrder>

  @belongsTo(() => Item)
  public item: BelongsTo<typeof Item>

  @belongsTo(() => SaleOrderLine)
  public saleOrderLine: BelongsTo<typeof SaleOrderLine>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
