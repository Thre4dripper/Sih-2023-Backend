import Exam from '../../../models/exam.model'

class ExamRepository {
    async create(data: any) {
        return Exam.create(data)
    }

    async getAllExams(limit: number, offset: number, organizationId: number) {
        return Exam.findAll({
            where: {
                organizationId,
            },
            limit,
            offset,
        })
    }
}

export default new ExamRepository()
