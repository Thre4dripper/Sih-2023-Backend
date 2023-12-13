import { Roles } from '../../../enums/Roles'
import User from '../../../models/User'

class OrganizationRepository {
    async find(filter: {}) {
        return User.findOne({
            where: filter
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

    async findProctor(id: number,organizationId: number) {
        return User.findOne({
            where: {
                id,
                role: Roles.PROCTOR,
            },
        })
    }

    async create(data: any) {
        return User.create(data)
    }

    async removeProctor(id: number) {
        return User.destroy({
            where: {
                id,
                role: Roles.PROCTOR,
            },
        })
    }
}

export default new OrganizationRepository()