import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StockPicking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sourceLocationId: number

  @column()
  public destinationLocationId: number

  @column()
  public operationType: string

  @column()
  public sourceDocumentId: number

  @column()
  public sourceDocumentType: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
