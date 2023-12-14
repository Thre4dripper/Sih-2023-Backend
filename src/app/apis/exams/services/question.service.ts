import { ICreateQuestion } from '../interfaces'
import ExamQuestionRepository from '../repositories/questions.repository'
import QuestionOption from '../../../models/question.option.model'
import examRepository from '../repositories/exam.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import questionOptionsRepository from '../repositories/question.options.repository'

class QuestionService {
    async createExamQuestions(data: ICreateQuestion) {
        const exam = await examRepository.find({
            id: data.examId,
        })

        if(!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }
        const question = await ExamQuestionRepository.create(data)

        const { id } = question

        for (const option of data.options) {
            await questionOptionsRepository.create({
                option: option.option,
                isCorrect: option.isCorrect,
                questionId: id,
            })
        }
    }

    async getAllExamQuestions(data: any) {
        const { examId } = data
        return await ExamQuestionRepository.findAll({
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
    }
}

export default new QuestionService()
