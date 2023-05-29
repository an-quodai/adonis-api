import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'

export default class ItemsController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, ...input } = request.qs()
    const items = await Item.query()
      .apply((scopes) => scopes.filtration(input))
      .preload('uom')
      .preload('purchaseUom')
      .paginate(page, perPage)

    const serializedItems = items.serialize({
      fields: ['id', 'name', 'uom', 'purchaseUom', 'price', 'cost', 'type', 'category'],
      relations: {
        uom: {
          fields: ['name'],
        },
        purchaseUom: {
          fields: ['name'],
        },
      },
    })
    return serializedItems
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

  public async update({ params, request, response }: HttpContextContract) {
    const payload = request.body()
    const item = await Item.findOrFail(params.id)
    item.merge(payload)
    if (item.$isDirty) {
      await item.save()
      return item
    }
    return response.noContent()
  }
}
