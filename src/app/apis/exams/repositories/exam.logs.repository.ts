import ExamLog from '../../../models/exam.log.model'

class ExamLogsRepository {
    async create(data: any) {
        return await ExamLog.create(data)
    }

    async findOne(filter: {}) {
        return await ExamLog.findOne({
            where: filter,
        })
    }

    async findAndCountAll(examId: number, limit: number, offset: number) {
        return await ExamLog.findAndCountAll({
            where: {
                examId: examId,
                logType: 'exam_started',
            },
            limit,
            offset,
            distinct: true,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'examId', 'studentId', 'createdAt'],
        })
    }

    async findAll(filter: any) {
        return await ExamLog.findAll({
            where: {
                filter,
            },
        })
    }

    async update(id: number, data: any) {
        return await ExamLog.update(data, {
            where: {
                id,
            },
        })
    }
}

export default new ExamLogsRepository()
