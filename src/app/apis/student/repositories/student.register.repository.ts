import User from '../../../models/user.model'
import { Roles } from '../../../enums/Roles'

class StudentRegisterRepository {
    async find(filter: {}) {
        return User.findOne({
            where: filter,
        })
    }

    async create(data: any) {
        return User.create(data)
    }

    async getAllStudents(limit: number, offset: number, organizationId: number) {
        return User.findAndCountAll({
            where: {
                role: Roles.STUDENT,
                organizationId,
            },
            limit,
            offset,
        })
    }
}

export default new StudentRegisterRepository()