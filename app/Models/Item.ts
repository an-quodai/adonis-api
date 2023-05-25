import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { ItemType } from './ItemType'
import ItemFilter from 'App/Models/Filters/ItemFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import Uom from './Uom'

export default class Item extends compose(BaseModel, Filterable) {
  public static $filter = () => ItemFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public uomId: number

  @belongsTo(() => Uom)
  public uom: BelongsTo<typeof Uom>

  @column()
  public purchaseUomId: number

  @belongsTo(() => Uom)
  public purchaseUom: BelongsTo<typeof Uom>

  @column()
  public price: number

  @column()
  public cost: number

  @column()
  public properties: object

  @column()
  public category_id: number

  @column()
  public type: ItemType

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
