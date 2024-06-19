import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasManyThrough } from '@adonisjs/lucid/orm'
import User from './user.js'
import Passenger from './passenger.js'
import type { BelongsTo, HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import AllowanceRequest from './allowance_request.js'
import Rating from './rating.js'

export default class Ride extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare driverId: number

  @column()
  declare veichleId: number

  @column()
  declare dateTime: DateTime

  @column()
  declare originLat: string

  @column()
  declare originLng: string

  @column()
  declare origin: string

  @column()
  declare destinationLat: string

  @column()
  declare destinationLng: string

  @column()
  declare destination: string

  @column()
  declare maxPassengers: number

  @column()
  declare automaticAllowance: boolean

  @column()
  declare status: 'PENDING' | 'IN_COURSE' | 'CLOSED' | 'CANCELLED'

  @hasManyThrough([ () => User, () => Passenger ])
  declare passengers: HasManyThrough<typeof User>

  @hasMany(() => AllowanceRequest)
  declare allowanceRequests: HasMany<typeof AllowanceRequest>

  @hasMany(() => Rating)
  declare ratings: HasMany<typeof Rating>

  @belongsTo(() => User, {
    foreignKey: 'driverId'
  })
  declare driver: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}