import User from '../../../models/User'

class ProctorRepository {
    async find(filter: {}) {
        return User.findOne(filter)
    }
}

export default new ProctorRepository()