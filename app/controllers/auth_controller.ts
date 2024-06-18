import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    public async login({ request, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        try {
            const user = await User.verifyCredentials(email, password)
            const token = await User.accessTokens.create(user)
            return token
        } catch {
            return response.unauthorized('Invalid credentials')
        }
    }

    public async logout({ auth }: HttpContext) {
        const user = await auth.getUserOrFail()
        const token = auth.user!.currentAccessToken.identifier
        await User.accessTokens.delete(user, token)
        return {
            revoked: true
        }
    }

    public async register({ request }: HttpContext) {
        const payload = request.only(['email', 'full_name', 'password'])
        const user = await User.create(payload)
        return user;
    }
}