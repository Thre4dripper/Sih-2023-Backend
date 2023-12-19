import { ICreateQuestion } from '../interfaces'
import ExamQuestionRepository from '../repositories/questions.repository'
import examRepository from '../repositories/exam.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import questionOptionsRepository from '../repositories/question.options.repository'
import questionsRepository from '../repositories/questions.repository'
import organizationRepository from '../../organization/repositories/organization.repository'

class QuestionService {
    async createExamQuestions(data: ICreateQuestion) {
        const exam = await examRepository.find({
            id: data.examId,
            organizationId: data.organizationId,
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

    async getAllExamQuestions(data: {
        limit: number
        offset: number
        examId: number
        organizationId: number
    }) {
        const { examId, organizationId, limit, offset } = data

        const organization = await organizationRepository.findOrganizationById(organizationId)

        if (!organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_NOT_FOUND)
        }

        const exam = await examRepository.find({
            id: examId,
        })

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        return await questionsRepository.getAllQuestions(examId, organizationId, limit, offset)
    }

    async deleteQuestion(data: { questionId: number; organizationId: number }) {
        const { questionId, organizationId } = data

        const question = await questionsRepository.findOne({
            id: questionId,
        })

        if (!question) {
            throw new ValidationError(ErrorMessages.QUESTION_NOT_FOUND)
        }

        const exam = await examRepository.find({
            id: question.examId,
        })

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        if (exam.organizationId !== organizationId) {
            throw new ValidationError(ErrorMessages.QUESTION_NOT_FOUND)
        }

        await questionsRepository.delete({
            id: questionId,
        })

        return {
            message: 'Question deleted successfully',
        }
    }
}

export default new QuestionService()
