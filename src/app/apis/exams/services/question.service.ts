import { ICreateQuestion } from '../interfaces'
import ExamQuestionRepository from '../repositories/questions.repository'
import ExamQuestionOptions from '../repositories/questionsOptions.repository'
import QuestionOption from '../../../models/question.option.model'
class QuestionService {
    async createExamQuestions(questiondata: ICreateQuestion, optiondata: any) {
        const question = await ExamQuestionRepository.create(questiondata)

        const { id } = question

        for (const option of optiondata.options) {
            await ExamQuestionOptions.create({
                option: option.option,
                isCorrect: option.isCorrect,
                questionId: id,
            })
        }
    }

    async getAllExamQuestions(data: any) {
        const { examId } = data
        const questions = await ExamQuestionRepository.findAll({
            where: {
                examId,
            },
            include: [
                {
                    model: QuestionOption,
                    as: 'options',
                },
            ],
            distict: true,
            limit: data.limit,
            offset: data.offset,
        })

        return questions
    }
}

export default new QuestionService()
