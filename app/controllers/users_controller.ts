import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user"

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
        return user;
    }

    public async show({ request }: HttpContext) {
        const userId = request.param('id')
        const user = await User.findOrFail(userId)
        return user;
    }

    public async update({ request }: HttpContext) {
        const userId = request.param('id')
        const payload = request.only(['email', 'name'])
        const user = await User.findOrFail(userId)
        await user.merge(payload).save()
        return user;
    }

    public async destroy({ request }: HttpContext) {
        const userId = request.param('id')
        const user = await User.findOrFail(userId)
        await user.delete();
        return 'User deleted successfully'
    }
}
 