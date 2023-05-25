import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Partner from 'App/Models/Partner'

export default class PartnersController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, ...input } = request.qs()
    const partners = await Partner.filter(input).paginate(page, perPage)
    return partners
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.body()
    const partner = await Partner.create(payload)
    return response.created(partner)
  }

  public async show({ params }: HttpContextContract) {
    const partner = await Partner.findOrFail(params.id)
    return partner
  }

  public async update({ params, request }: HttpContextContract) {
    const payload = request.body()
    const partner = await Partner.findOrFail(params.id)
    partner.merge(payload)
    await partner.save()
    return partner
  }
}
