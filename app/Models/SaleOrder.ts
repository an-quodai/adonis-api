import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SaleOrderLine from './SaleOrderLine'
import SaleOrderFilter from './Filters/SaleOrderFilter'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'

export default class SaleOrder extends compose(BaseModel, Filterable) {
  public static $filter = () => SaleOrderFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public customerId: number

  @column()
  public discount: number = 0

  @column()
  public status: string

  @hasMany(() => SaleOrderLine, {
    foreignKey: 'saleOrderId',
  })
  public saleOrderLines: HasMany<typeof SaleOrderLine>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
