import ExamLog from '../../../models/exam.log.model'

class ExamLogsRepository {
    async create(data: any) {
        return await ExamLog.create(data)
    }

    async findOne(data: any) {
        return await ExamLog.findOne(data)
    }

    async findAndCountAll(examId: number, limit: number, offset: number) {
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

    async findAll(data: any) {
        return await ExamLog.findAll({
            where: {
                studentId: data.studentId,
                examId: data.examId,
            },
        })
    }
}

export default new ExamLogsRepository()
