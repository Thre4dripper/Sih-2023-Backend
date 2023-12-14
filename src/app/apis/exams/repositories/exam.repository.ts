import Exam from '../../../models/exam.model'

class ExamRepository {
    async create(data: any) {
        return Exam.create(data)
    }

    async findAll(data: any) {
        return Exam.findAndCountAll(data)
    }
}

export default new ExamRepository()
