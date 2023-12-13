import User from '../../../models/User'
import { Roles } from '../../../enums/Roles'

class SuperAdminRepository {
    async findSuperAdmin(filter: {}) {
        return User.findOne({
            where: {
                ...filter,
                role: Roles.SUPER_ADMIN,
            },
        })
    }

    async createSuperAdmin(data: any) {
        return User.create(data)
    }
}

export default new SuperAdminRepository()