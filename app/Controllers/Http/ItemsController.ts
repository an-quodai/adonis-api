import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'

export default class ItemsController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, ...input } = request.qs()
    const items = await Item.query()
      .apply((scopes) => scopes.filtration(input))
      .join('uoms', 'uoms.id', '=', 'items.uom_id')
      .select('uom.name as uom', 'items.*')
      .paginate(page, perPage)
    return items
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.body()
    const item = await Item.create(payload)
    return response.created(item)
  }

  public async show({ params }: HttpContextContract) {
    const item = await Item.findOrFail(params.id)
    return item
  }

  public async update({ params, request }: HttpContextContract) {
    const payload = request.body()
    const item = await Item.findOrFail(params.id)
    item.merge(payload)
    await item.save()
    return item
  }
}
