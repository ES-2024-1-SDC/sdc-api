import AllowanceRequest from '#models/allowance_request';
import Passenger from '#models/passenger';
import Rating from '#models/rating';
import Ride from '#models/ride';
import type { HttpContext } from '@adonisjs/core/http'

export default class RidesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    let result = await Ride.query()
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
    const payload = request.only(
      [
        'driverId',
        'veichleId',
        'dateTime',
        'originLat',
        'originLng',
        'origin',
        'destinationLat',
        'destinationLng',
        'destination',
        'maxPassengers',
        'automaticAllowance'
      ]
    )
    const result = await Ride.create(payload)
    return result
  }

  /**
   * Show individual record
   */
  async show({ request }: HttpContext) {
    const id = request.param('id')
    const result = await Ride.findOrFail(id)
    return result
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request }: HttpContext) {
    const id = request.param('id')
    const payload = request.only(
      [
        'driverId',
        'veichleId',
        'dateTime',
        'originLat',
        'originLng',
        'origin',
        'destinationLat',
        'destinationLng',
        'destination',
        'maxPassengers',
        'automaticAllowance'
      ]
    )
    const result = await Ride.findOrFail(id)
    await result.merge(payload).save()
    return result
  }

  /**
   * Delete record
   */
  async destroy({ request }: HttpContext) {
    const id = request.param('id')
    const result = await Ride.findOrFail(id)
    await result.merge({ status: 'CANCELLED' }).save()
    return 'Ride cancelled successfully'
  }

  async getRideRequests({ request }: HttpContext) {
    const id = request.param('id')
    const result = await AllowanceRequest.query()
      .where('rideId', id)
      .preload('user')
    return result
  }

  async getRidePassengers({ request }: HttpContext) {
    const id = request.param('id')
    const result = await Passenger.query()
      .where('rideId', id)
      .preload('user')
    return result
  }

  async getRideRatings({ request }: HttpContext) {
    const id = request.param('id')
    const result = await Rating.query()
      .where('rideId', id)
    return result
  }

  async deleteRidePassenger({ request, response }: HttpContext) {
    const rideId = request.param('rideId')
    const userId = request.param('userId')
    if (!rideId || !userId) {
      return response.status(404).json({
        error: 'E_PASSENGER_NOT_FOUND',
        message: 'The passenger could not be obtained'
      })
    }
    const result = await Passenger.query()
      .where('rideId', rideId)
      .andWhere('userId', userId)
    if (result.length < 1) {
      return response.status(404).json({
        error: 'E_PASSENGER_NOT_FOUND',
        message: 'The passenger could not be obtained'
      })
    }
    await result[0].delete()
    return 'The passenger has been deleted successfully'
  }
}