import Exam from '../../../models/exam.model'

class ExamRepository {
    async create(data: any) {
        return Exam.create(data)
    }
}

export default new ExamRepository()
