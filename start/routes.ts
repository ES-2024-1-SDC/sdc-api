/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import UsersController from '#controllers/users_controller'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return 'SDC API running (v0.0.1.alpha20240617).'
})

router.group(() => {
  router.post('login', [AuthController, 'login']).as('auth.login')
  router.post('logout', [AuthController, 'logout']).as('auth.logout')
}).prefix('auth')

router.resource('users', UsersController)
  .except(['create', 'edit'])
  .use('*', middleware.auth({ guards: ['api'] }))