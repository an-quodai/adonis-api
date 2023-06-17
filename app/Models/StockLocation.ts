import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class StockLocation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: 'internal' | 'external' | 'scrap'

  @column()
  public parentId: number

  @belongsTo(() => StockLocation)
  public parentLocations: BelongsTo<typeof StockLocation>

  @hasMany(() => StockLocation, {
    foreignKey: 'parentId',
  })
  public childrenLocations: HasMany<typeof StockLocation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
