import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SaleOrder from 'App/Models/SaleOrder'

export default class SaleOrdersController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, ...input } = request.qs()
    const saleOrders = await SaleOrder.filter(input).paginate(page, perPage)
    return saleOrders
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.body()
    const saleOrder = await SaleOrder.create(payload)
    return response.created(saleOrder)
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
