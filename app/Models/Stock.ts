import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public stockLocationId: number

  @column()
  public itemId: number

  @column()
  public available: number

  @column()
  public reserved: number

  @column()
  public incoming: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
