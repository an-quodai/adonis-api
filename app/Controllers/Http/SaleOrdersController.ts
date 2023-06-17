import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SaleOrder from 'App/Models/SaleOrder'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Event from '@ioc:Adonis/Core/Event'
import Stock from 'App/Models/Stock'
import StockPicking from 'App/Models/StockPicking'

export default class SaleOrdersController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, ...input } = request.qs()
    const saleOrders = await SaleOrder.filter(input)
      .withCount('productionOrders', (query) => {
        query.as('productionOrderCount')
      })
      .withCount('saleOrderLines', (query) => {
        query.as('productableSaleLineCount').whereHas('item', (query) => {
          query.where('type', 'product')
        })
      })
      .preload('customer')
      .paginate(page, perPage)
    return saleOrders
  }

  public async store({ request, response }: HttpContextContract) {
    const newOrderSchema = schema.create({
      customerId: schema.number(),
      discount: schema.number.optional(),
      status: schema.string.optional(),
      key: schema.string.optional(),
      saleOrderLines: schema.array().members(
        schema.object().members({
          itemId: schema.number(),
          quantity: schema.number(),
          unitPrice: schema.number(),
          note: schema.string.optional(),
          deliveryDate: schema.date.optional(),
        })
      ),
    })
    await Database.transaction(
      async (trx) =>
        await trx.transaction(async () => {
          const payload = await request.validate({ schema: newOrderSchema })

          const saleOrder = await SaleOrder.create(
            {
              customerId: payload.customerId,
              discount: payload.discount,
            },
            { client: trx }
          )
          await saleOrder
            .related('saleOrderLines')
            .createMany(payload.saleOrderLines, { client: trx })
          // const stockPicking = await StockPicking.create({
          //   sourceDocumentId: saleOrder.id,
          //   sourceDocumentType: 'sale-orders',
          //   sourceLocationId: ,
          // })
          return saleOrder
        })
    )
      .then((saleOrder) => {
        return response.created(saleOrder)
      })
      .catch((error) => {
        return response.badRequest({ message: error.message })
      })
  }

  public async show({ params }: HttpContextContract) {
    const saleOrder = await SaleOrder.findOrFail(params.id)
    return saleOrder
  }

  public async update({ params, request }: HttpContextContract) {
    const payload = request.body()
    const saleOrder = await SaleOrder.findOrFail(params.id)
    saleOrder.merge(payload)
    await saleOrder.save()
    return saleOrder
  }
}
