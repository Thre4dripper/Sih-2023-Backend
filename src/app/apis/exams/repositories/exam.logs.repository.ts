import ExamLog from '../../../models/exam.log.model'

class ExamLogsRepository {
    async create(data: any) {
        return await ExamLog.create(data)
    }

    async findOne(data: any) {
        return await ExamLog.findOne(data)
    }

    async findAll(filter: any, limit: number, offset: number) {
        return await ExamLog.findAndCountAll({
            where: {
                ...filter,
            },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        })
    }
}

export default new ExamLogsRepository()
