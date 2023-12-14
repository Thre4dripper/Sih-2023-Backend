import User from '../../../models/User'
import { Roles } from '../../../enums/Roles'

class ProctorRepository {
    async find(filter: {}) {
        return User.findOne(filter)
    }

    async findProctorById(id: number, organizationId: number) {
        return User.findOne({
            where: {
                id,
                role: Roles.PROCTOR,
            },
        })
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

export default new ProctorRepository()