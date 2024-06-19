import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user"
import AllowanceRequest from '#models/allowance_request'
import Ride from '#models/ride'
import Rating from '#models/rating'
import Passenger from '#models/passenger'

export default class UsersController {
  public async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const nameFilter = request.input('name', '')
    const emailFilter = request.input('email', '')

    let result: any;

    if (nameFilter || emailFilter) {
      result = await User.query()
        .where('name', 'like', `%${nameFilter}%`)
        .andWhere('email', 'like', `%${emailFilter}%`)
        .paginate(page, limit)
    } else {
      result = await User.query()
        .paginate(page, limit)
    }
    const users = result.all()
    return response.status(200).json({
      meta: result.getMeta(),
      data: users
    });
  }

  public async store({ request }: HttpContext) {
    const payload = request.only(['email', 'full_name', 'password'])
    const user = await User.create(payload)
    return user
  }

  public async show({ request }: HttpContext) {
    const userId = request.param('id')
    const user = await User.findOrFail(userId)
    return user
  }

  public async update({ request }: HttpContext) {
    const userId = request.param('id')
    const payload = request.only(['email', 'name'])
    const user = await User.findOrFail(userId)
    await user.merge(payload).save()
    return user
  }

  public async destroy({ request }: HttpContext) {
    const userId = request.param('id')
    const user = await User.findOrFail(userId)
    await user.delete();
    return 'User deleted successfully'
  }

  public async getUserVeichles({ request }: HttpContext) {
    const userId = request.param('id')
    const user = await User.findOrFail(userId)
    await user.preload('veichles')
    return user.veichles
  }

  public async getUserRequests({ request }: HttpContext) {
    const userId = request.param('id')
    const result = await AllowanceRequest.query()
      .where('userId', userId)
      .preload('ride')
    return result
  }

  public async getUserRating({ request }: HttpContext) {
    const id = request.param('id')
    const rides = await Ride.query()
      .where('driverId', id)
      .preload('ratings')
    let totalValue: number = 0
    let totalNumber: number = 0
    rides.forEach((ride: Ride) => {
      ride.ratings.forEach((rating: Rating) => {
        totalValue += rating.value
        totalNumber += 1
      })
    })
    return Math.round((totalValue/totalNumber)*100)/100
  }

  public async getUserOfferingRides({ request }: HttpContext) {
    const id = request.param('id')
    const rides = await Ride.query()
      .where('driverId', id)
    return rides
  }

  public async getUserPassengerRides({ request }: HttpContext) {
    const id = request.param('id')
    const passengers = await Passenger.query()
      .where('userId', id)
      .preload('ride')
    let result: Ride[] = []
    passengers.forEach((passenger: Passenger) => {
      result.push(passenger.ride)
    })
    return result
  }
}
