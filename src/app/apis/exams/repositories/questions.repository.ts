import ExamQuestion from '../../../models/question.model'
class ExamQuestionRepository {
    async create(data: any) {
        return ExamQuestion.create(data)
    }

    async findAll(data: any) {
        return ExamQuestion.findAndCountAll(data)
    }
}

export default new ExamQuestionRepository()
