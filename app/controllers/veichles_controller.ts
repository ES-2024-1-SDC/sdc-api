import Veichle from '#models/veichle';
import type { HttpContext } from '@adonisjs/core/http'

export default class VeichlesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    let result = await Veichle.query()
      .paginate(page, limit)

    return response.status(200).json({
      meta: result.getMeta(),
      data: result.all()
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = request.only(['userId', 'licensePlate', 'brand', 'model', 'color'])
    const result = await Veichle.create(payload)
    return result
  }

  /**
   * Show individual record
   */
  async show({ request }: HttpContext) {
    const id = request.param('id')
    const result = await Veichle.findOrFail(id)
    return result
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request }: HttpContext) {
    const id = request.param('id')
    const payload = request.only(['userId', 'licensePlate', 'brand', 'model', 'color'])
    const result = await Veichle.findOrFail(id)
    await result.merge(payload).save()
    return result
  }

  /**
   * Delete record
   */
  async destroy({ request }: HttpContext) {
    const id = request.param('id')
    const result = await Veichle.findOrFail(id)
    await result.delete();
    return 'Veichle deleted successfully'
  }
}