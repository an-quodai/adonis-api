import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { ItemType } from './ItemType'
import ItemFilter from 'App/Models/Filters/ItemFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'

export default class Item extends compose(BaseModel, Filterable) {
  public static $filter = () => ItemFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

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
