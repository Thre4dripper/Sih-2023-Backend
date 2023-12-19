import ExamLog from '../../../models/exam.log.model'

class ExamLogsRepository {
    async create(data: any) {
        return await ExamLog.create(data)
    }

    async findOne(data: any) {
        return await ExamLog.findOne(data)
    }

    async findAll(examId: number, limit: number, offset: number) {
        const data = await ExamLog.findAndCountAll({
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
        return data
    }
}

export default new ExamLogsRepository()
