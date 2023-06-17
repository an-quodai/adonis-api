import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SaleOrderLine from 'App/Models/SaleOrderLine'

export default class SaleOrderLinesController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, ...input } = request.qs()
    const saleOrderLines = await SaleOrderLine.filter(input).preload('item').paginate(page, perPage)
    return saleOrderLines
  }

  public async getNoProductionSaleLines({ request }: HttpContextContract) {
    const saleOrderLines = await SaleOrderLine.query()
      .where('sale_order_id', request.param('id'))
      .doesntHave('productionOrders')
      .preload('item')
    return { data: saleOrderLines }
  }
}
