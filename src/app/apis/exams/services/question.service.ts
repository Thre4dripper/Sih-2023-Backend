import { ICreateQuestion } from '../interfaces'
import ExamQuestionRepository from '../repositories/questions.repository'
import examRepository from '../repositories/exam.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import questionOptionsRepository from '../repositories/question.options.repository'
import questionsRepository from '../repositories/questions.repository'

class QuestionService {
    async createExamQuestions(data: ICreateQuestion) {
        const exam = await examRepository.find({
            id: data.examId,
        })

        if (!exam) {
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

    async getAllExamQuestions(data: { limit: number; offset: number; examId: number }) {
        const { examId, limit, offset } = data

        const exam = await examRepository.find({
            id: examId,
        })

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }
        return await questionsRepository.getAllQuestions(examId, limit, offset)
    }
}

export default new QuestionService()
