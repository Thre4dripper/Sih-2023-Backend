import ExamQuestion from '../../../models/question.model'
import QuestionOption from '../../../models/question.option.model'

class ExamQuestionRepository {
    async create(data: any) {
        return ExamQuestion.create(data)
    }

    async getAllQuestions(examId: number, limit: number, offset: number) {
        return ExamQuestion.findAndCountAll({
            where: {
                examId,
            },
            include: [
                {
                    model: QuestionOption,
                    as: 'options',
                },
            ],
            limit,
            offset,
            distinct: true,
        })
    }

    async findOne(data: any) {
        return ExamQuestion.findOne({
            where: data,
        })
    }

    async delete(data: any) {
        return ExamQuestion.destroy({
            where: data,
        })
    }
}

export default new ExamQuestionRepository()
