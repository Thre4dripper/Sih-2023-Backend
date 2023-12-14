import User from '../../../models/user.model'

class StudentRegisterRepository {
    async find(filter: {}) {
        return User.findOne({
            where: filter,
        })
    }

    async create(data: any) {
        return User.create(data)
    }
}

export default new StudentRegisterRepository()