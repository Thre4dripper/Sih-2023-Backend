import { Roles } from '../../../enums/Roles'
import User from '../../../models/user.model'

class OrganizationRepository {
    async find(filter: {}) {
        return User.findOne({
            where: filter,
        })
    }

    async findOrganizationById(id: number) {
        return User.findOne({
            where: {
                id,
                role: Roles.ORGANIZATION,
            },
        })
    }

    async create(data: any) {
        return User.create(data)
    }

    async getAllOrganizations(limit: number, offset: number) {
        return User.findAndCountAll({
            where: {
                role: Roles.ORGANIZATION,
            },
            limit,
            offset,
        })
    }
}

export default new OrganizationRepository()