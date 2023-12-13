import User from '../../../models/User'

class SuperAdminRepository {
    async findSuperAdmin(filter: {}) {
        return User.findOne(filter)
    }

    async createSuperAdmin(data: any) {
        return User.create(data)
    }
}

export default new SuperAdminRepository()