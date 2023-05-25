import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import PartnerFilter from './Filters/PartnerFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import SaleOrder from './SaleOrder'

export default class Partner extends compose(BaseModel, Filterable) {
  public static $filter = () => PartnerFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public countryCode: string

  @column()
  public isSupplier: boolean

  @column()
  public isCustomer: boolean

  @column()
  public companyId: number

  @hasMany(() => SaleOrder, {
    foreignKey: 'customerId',
  })
  public saleOrders: HasMany<typeof SaleOrder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
