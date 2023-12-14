import QuestionOption from '../../../models/question.option.model'

class QuestionOptionRepository {
    async create(data: any) {
        return QuestionOption.create(data)
    }
}

export default new QuestionOptionRepository()
