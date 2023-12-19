import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import organizationRepository from '../../organization/repositories/organization.repository'
import examRepository from '../repositories/exam.repository'
import questionsRepository from '../repositories/questions.repository'
import studentRepository from '../../student/repositories/student.repository'

class AnalyticsService {
    async getExamAnalytics(examId: number, organizationId: number) {
        const organization = await organizationRepository.find({
            id: organizationId,
        })

        if (!organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_NOT_FOUND)
        }

        const exam = await examRepository.find({
            id: examId,
            organizationId,
        })
        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        const examQuestionsResult = await questionsRepository.getAllQuestions(
            examId,
            organizationId,
            exam.totalQuestions,
            0
        )

        const examQuestions = examQuestionsResult.rows

        const students = await studentRepository.getAllExamStudents(examId, organizationId)

        return {
            exam,
            examQuestions,
            students,
        }
    }
}

export default new AnalyticsService()