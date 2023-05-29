import {
  BaseModel,
  afterCreate,
  afterUpdate,
  beforeDelete,
  beforeUpdate,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import Audit from 'App/Models/AuditModel'
import { DateTime } from 'luxon'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class AuditModel extends BaseModel {
  public static table = 'audits'

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public auditableId: number

  @column()
  public auditable: string

  @column()
  public event: string

  @column()
  public ip: string

  @column()
  public url: string

  @column()
  public oldData: string

  @column()
  public newData: string

  @column.dateTime()
  public createdAt: DateTime

  @beforeUpdate()
  public static async updateAudit(model: AuditModel) {
    if (model.constructor === AuditModel) return

    const ctx = HttpContext.get()
    if (ctx === null) return

    if (model.$isDirty === false) return

    let { request, auth } = ctx
    const ipAddress = request.ip()
    const url = request.url(true)
    const primaryKeyValue = model.$primaryKeyValue
    const originalData = model.$original
    const newData = model.$dirty
    let oldData = {}
    for (const key in newData) {
      oldData[key] = originalData[key]
    }

    // Controlla se il modello che sta per essere creato è lo stesso del modello AuditModel

    await Audit.create({
      event: 'update',
      userId: auth && auth.user ? auth.user.id : undefined,
      url: url,
      auditable: model.constructor.name,
      auditableId: primaryKeyValue as number,
      ip: ipAddress,
      oldData: JSON.stringify(oldData),
      newData: JSON.stringify(newData),
      createdAt: DateTime.now(),
    })
  }

  @afterCreate()
  public static async createAudit(model: AuditModel) {
    if (model.constructor === AuditModel) return

    const ctx = HttpContext.get()
    if (ctx === null) return
    // Attraverso il Context che è sotto AsyncLocalStorage che ho creato in precedenza vado a prendermi il contest
    let { request, auth } = ctx
    // Recupero Indirizzo IP
    const ipAddress = request.ip()
    // Recupero Url che ha innescato la chiamata
    const url = request.url(true)
    // Recupero Valore della chiave primaria
    const primaryKeyValue = model.$primaryKeyValue
    // Recupero Valori Modificati
    const newData = model.$attributes
    // Controlla se il modello che sta per essere creato è lo stesso del modello AuditModel

    // Verifica se ci sono modifiche tra i dati originali e i nuovi dati
    await Audit.create({
      event: 'create',
      userId: auth && auth.user ? auth.user.id : undefined,
      url: url,
      auditable: model.constructor.name,
      auditableId: primaryKeyValue as number,
      ip: ipAddress,
      oldData: '{}',
      newData: JSON.stringify(newData),
      createdAt: DateTime.now(),
    })
  }

  @beforeDelete()
  public static async deleteAudit(model: AuditModel) {
    if (model.constructor === AuditModel) return

    const ctx = HttpContext.get()
    if (ctx === null) return

    let { request, auth } = ctx
    const ipAddress = request.ip()
    const url = request.url(true)
    const primaryKeyValue = model.$primaryKeyValue
    const originalData = model.$original

    await Audit.create({
      event: 'delete',
      userId: auth && auth.user ? auth.user.id : undefined,
      url: url,
      auditable: model.constructor.name,
      auditableId: primaryKeyValue as number,
      ip: ipAddress,
      oldData: JSON.stringify(originalData),
      newData: '',
      createdAt: DateTime.now(),
    })
  }
}
