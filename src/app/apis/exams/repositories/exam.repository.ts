import Exam from '../../../models/exam.model'

class ExamRepository {
    async find(filter: {}) {
        return Exam.findOne({
            where: filter,
        })
    }

    async create(data: any) {
        return Exam.create(data)
    }

    async getAllExams(limit: number, offset: number, organizationId: number) {
        return Exam.findAndCountAll({
            where: {
                organizationId,
            },
            limit,
            offset,
        })
    }

    async findOne(filter: {}) {
        return Exam.findOne({
            where: filter,
        })
    }

    async update(data: any, filter: any) {
        return Exam.update(data, {
            where: filter,
        })
    }
}

export default new ExamRepository()
