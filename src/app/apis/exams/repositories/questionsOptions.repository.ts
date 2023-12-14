import QuestionOption from '../../../models/question.option.model'

class ExamQuestionOption {
    async create(data: any) {
        return QuestionOption.create(data)
    }
}

export default new ExamQuestionOption()
