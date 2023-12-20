import ExamQuestion from '../../../models/question.model'
import QuestionOption from '../../../models/question.option.model'
import Exam from '../../../models/exam.model'

class ExamQuestionRepository {
    async create(data: any) {
        return ExamQuestion.create(data)
    }

    async getAllQuestions(examId: number, organizationId: number, limit: number, offset: number) {
        return ExamQuestion.findAndCountAll({
            where: {
                examId,
            },
            include: [
                {
                    model: QuestionOption,
                    as: 'options',
                },
                {
                    model: Exam,
                    as: 'exam',
                    where: {
                        organizationId,
                    },
                }
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

    async getExamQuestionsCount(examId: number) {
        return ExamQuestion.count({
            where: {
                examId,
            },
        })
    }
}

export default new ExamQuestionRepository()
