import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StockMovement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sourceDocument: string

  @column()
  public sourceLocationId: number

  @column()
  public destinationLocationId: number

  @column()
  public itemId: number

  @column()
  public quantity: number

  @column()
  public unitCost: number

  @column()
  public totalCost: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
