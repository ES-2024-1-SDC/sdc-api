import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Ride from './ride.js'

export default class Passenger extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare rideId: number

  @column()
  declare userId: number

  @belongsTo( () => User )
  declare user: BelongsTo<typeof User>

  @belongsTo( () => Ride )
  declare ride: BelongsTo<typeof Ride>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}