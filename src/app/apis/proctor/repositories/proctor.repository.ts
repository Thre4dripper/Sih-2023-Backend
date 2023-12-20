import User from '../../../models/user.model'
import { Roles } from '../../../enums/Roles'

class ProctorRepository {
    async find(filter: {}) {
        return User.findOne({
            where: filter,
        })
    }

    async findProctorById(id: number, organizationId: number) {
        return User.findOne({
            where: {
                id,
                organizationId,
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

    async getAllProctors(limit: number, offset: number, organizationId: number) {
        const proctors = await User.findAndCountAll({
            where: {
                role: Roles.PROCTOR,
                organizationId,
            },
            limit,
            offset,
        })

        return {
            proctors: proctors.rows,
            count: proctors.count,
        }
    }

    async verifyStudent(data: { id: number }, updateData: {}) {

        await User.update(updateData, {
            where: {
                id: data.id,
                role: Roles.STUDENT,
            },
        })

        return User.findOne({
            where: {
                id: data.id,
                role: Roles.STUDENT,
            },
        })
    }
}

export default new ProctorRepository()
