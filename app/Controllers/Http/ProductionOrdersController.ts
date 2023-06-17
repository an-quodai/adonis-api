import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductionOrder from 'App/Models/ProductionOrder'
import { schema } from '@ioc:Adonis/Core/Validator'
import SaleOrderLine from 'App/Models/SaleOrderLine'

export default class ProductionOrdersController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, ...input } = request.qs()
    const productionOrders = await ProductionOrder.filter(input)
      .preload('saleOrder', (query) => {
        query.preload('customer')
      })
      .preload('item', (query) => {
        query.preload('uom')
      })
      .paginate(page, perPage)
    const serializedProductionOrders = productionOrders.serialize({
      fields: {
        pick: ['id', 'saleOrder', 'item', 'quantity', 'deadline', 'status'],
      },
      relations: {
        saleOrder: {
          fields: {
            pick: ['id', 'customer'],
          },
          relations: {
            customer: {
              fields: {
                pick: ['id', 'name'],
              },
            },
          },
        },
        item: {
          fields: {
            pick: ['id', 'name'],
          },
          relations: {
            uom: {
              fields: {
                pick: ['id', 'name'],
              },
            },
          },
        },
      },
    })
    return serializedProductionOrders
  }

  public async createFromSale({ request }: HttpContextContract) {
    const newProductionOrderSchema = schema.create({
      saleLineIds: schema.array().members(schema.number()),
    })
    const { saleLineIds } = await request.validate({
      schema: newProductionOrderSchema,
    })

    for (let i = 0; i < saleLineIds.length; i++) {
      const saleLineId = saleLineIds[i]
      const saleLine = await SaleOrderLine.findOrFail(saleLineId)
      if (saleLine) {
        saleLine.related('productionOrders').create({
          saleOrderId: saleLine.saleOrderId,
          saleOrderLineId: saleLine.id,
          itemId: saleLine.itemId,
          quantity: saleLine.quantity,
        })
      }
    }
  }
}
