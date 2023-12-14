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

    async finOne(data: any) {
        return Exam.findOne(data)
    }

    async update(data: any) {
        await Exam.update(data, {
            where: {
                id: data.id,
            },
        })
        return Exam.findOne({
            where: {
                id: data.id,
            },
        })
    }
}

export default new ExamRepository()
