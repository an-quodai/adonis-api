import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SaleOrderLine from './SaleOrderLine'
import SaleOrderFilter from './Filters/SaleOrderFilter'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import Partner from './Partner'
import ProductionOrder from './ProductionOrder'

export default class SaleOrder extends compose(BaseModel, Filterable) {
  public static $filter = () => SaleOrderFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public customerId: number

  @belongsTo(() => Partner, {
    foreignKey: 'customerId',
  })
  public customer: BelongsTo<typeof Partner>

  @column()
  public discount: number = 0

  @column()
  public status: string

  @hasMany(() => SaleOrderLine, {
    foreignKey: 'saleOrderId',
  })
  public saleOrderLines: HasMany<typeof SaleOrderLine>

  @hasMany(() => ProductionOrder, {
    foreignKey: 'saleOrderId',
  })
  public productionOrders: HasMany<typeof ProductionOrder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serializeExtras() {
    return {
      productableSaleLineCount: this.$extras.productableSaleLineCount,
      productionOrderCount: this.$extras.productionOrderCount,
    }
  }
}
