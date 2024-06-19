/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

import AuthController from '#controllers/auth_controller'
import UsersController from '#controllers/users_controller'
import VeichlesController from '#controllers/veichles_controller'
import RidesController from '#controllers/rides_controller'
import AllowanceRequestsController from '#controllers/allowance_requests_controller'

router.get('/', async () => {
  return 'SDC API running (v1.0.0.20240618).'
})

router.group(() => {
  router.post('login', [AuthController, 'login']).as('auth.login')
  router.post('logout', [AuthController, 'logout']).as('auth.logout')
  router.post('register', [AuthController, 'register']).as('auth.register')
}).prefix('auth')

router.resource('users', UsersController)
  .except(['create', 'edit'])
  .use('*', middleware.auth({ guards: ['api'] }))
router.get('users/:id/veichles', [UsersController, 'getUserVeichles'])
  .use(middleware.auth({ guards: ['api'] }))
router.get('users/:id/requests', [UsersController, 'getUserRequests'])
  .use(middleware.auth({ guards: ['api'] }))
router.get('users/:id/rating', [UsersController, 'getUserRating'])
  .use(middleware.auth({ guards: ['api'] }))
router.get('users/:id/offering-rides', [UsersController, 'getUserOfferingRides'])
  .use(middleware.auth({ guards: ['api'] }))
router.get('users/:id/passenger-rides', [UsersController, 'getUserPassengerRides'])
  .use(middleware.auth({ guards: ['api'] }))

router.resource('veichles', VeichlesController)
  .except(['create', 'edit'])
  .use('*', middleware.auth({ guards: ['api'] }))

router.resource('rides', RidesController)
  .except(['create', 'edit'])
  .use('*', middleware.auth({ guards: ['api'] }))
router.get('rides/:id/requests', [RidesController, 'getRideRequests'])
  .use(middleware.auth({ guards: ['api'] }))
router.get('rides/:id/passengers', [RidesController, 'getRidePassengers'])
  .use(middleware.auth({ guards: ['api'] }))
router.get('rides/:id/rating', [RidesController, 'getRideRatings'])
  .use(middleware.auth({ guards: ['api'] }))
router.delete('rides/:rideId/passenger/:userId', [RidesController, 'deleteRidePassenger'])
  .use(middleware.auth({ guards: ['api'] }))

router.resource('allowance-request', AllowanceRequestsController)
  .except(['create', 'edit'])
  .use('*', middleware.auth({ guards: ['api'] }))