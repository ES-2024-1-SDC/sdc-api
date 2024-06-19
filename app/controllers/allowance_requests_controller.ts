import AllowanceRequest from '#models/allowance_request';
import Passenger from '#models/passenger';
import Ride from '#models/ride';
import type { HttpContext } from '@adonisjs/core/http'

export default class AllowanceRequestsController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = request.only(['rideId', 'userId'])
    const ride = await Ride.findOrFail(payload.rideId)
    await ride.preload('passengers')
    if (ride.automaticAllowance) {
      if (ride.passengers.length >= ride.maxPassengers) {
        return response.status(409).json({
          error: 'E_REQUEST_NOT_CREATED',
          message: 'The request could not be created due to maximum passengers number reached'
        })
      } else {
        const result = await Passenger.create(payload)
        return result
      }
    } else {
      const result = await AllowanceRequest.create(payload)
      return result
    }
  }

  /**
   * Show individual record
   */
  async show({ request }: HttpContext) {
    const id = request.param('id')
    const result = await AllowanceRequest.findOrFail(id)
    return result
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response }: HttpContext) {
    const id = request.param('id')
    const payload = request.only(['rideId', 'userId', 'status'])
    if (payload.status == 'ACCEPTED') {
      const ride = await Ride.findOrFail(payload.rideId)
      await ride.preload('passengers')
      if (ride.passengers.length >= ride.maxPassengers) {
        const allowanceRequest = await AllowanceRequest.findOrFail(id)
        await allowanceRequest.merge({ status: 'REJECTED' }).save()
        return response.status(409).json({
          error: 'E_REQUEST_NOT_CREATED',
          message: 'The request could not be accepted due to maximum passengers number reached'
        })
      } else {
        const allowanceRequest = await AllowanceRequest.findOrFail(id)
        await allowanceRequest.merge({ status: 'ACCEPTED' }).save()
        const result = await Passenger.create(payload)
        return result
      }
    }
    const result = await AllowanceRequest.findOrFail(id)
    await result.merge(payload).save()
    return result
  }

  /**
   * Delete record
   */
  async destroy({ request }: HttpContext) {
    const id = request.param('id')
    const result = await AllowanceRequest.findOrFail(id)
    await result.merge({ status: 'CANCELLED' }).save()
    return 'Request rejected successfully'
  }
}