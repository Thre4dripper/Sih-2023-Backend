import { Roles } from '../../../enums/Roles'
import User from '../../../models/User'

class OrganizationRepository {
    async findOrganization(filter: {}) {
        return User.findOne({
            where: {
                ...filter,
                role: Roles.ORGANIZATION,
            },
        })
    }

    async createOrganization(data: any) {
        return User.create(data)
    }
}

export default new OrganizationRepository()