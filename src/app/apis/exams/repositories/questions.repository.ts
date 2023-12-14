import ExamQuestion from '../../../models/question.model'
class ExamQuestionRepository {
    async create(data: any) {
        return ExamQuestion.create(data)
    }
}

export default new ExamQuestionRepository()
