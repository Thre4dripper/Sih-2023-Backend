import { ICreateExam } from '../interfaces'
import examRepository from '../repositories/exam.repository'
import examLogsRepository from '../repositories/exam.logs.repository'
import organizationRepository from '../../organization/repositories/organization.repository'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'

class ExamService {
    async createExam(data: ICreateExam) {
        const organization = await organizationRepository.find({
            id: data.organizationId,
        })

        console.log(organization)

        if (!organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_NOT_FOUND)
        }
        return await examRepository.create(data)
    }

    async getAllExams(data: { limit: number; offset: number; organizationId: number }) {
        const organization = await organizationRepository.findOrganizationById(data.organizationId)

        if (!organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_NOT_FOUND)
        }
        const { limit, offset, organizationId } = data
        return await examRepository.getAllExams(limit, offset, organizationId)
    }

    async getExamById(examId: number, organizationId: number) {
        const exam = await examRepository.findOne({
            id: examId,
            organizationId,
        })

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        return exam
    }

    async updateExam(data: ICreateExam) {
        const { id, organizationId } = data
        const exam = await examRepository.findOne({
            id,
            organizationId,
        })

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        return await examRepository.update(data, id)
    }

    async getAllStudentByExamId(data: { examId: number; limit: number; offset: number }) {
        const { examId, limit, offset } = data

        const exam = await examRepository.findOne({
            id: examId,
        })

        if (!exam) {
            throw new ValidationError('Exam not found')
        }

        const examData = await examLogsRepository.findAndCountAll(examId, limit, offset)

        if (!examData) {
            throw new ValidationError('Something went wrong')
        }

        return examData
    }

    async getExamLogs(studentId: number, organizationId: number, examId: number) {
        const examLogs = await examLogsRepository.findAll({
            studentId,
            examId,
            logType: ExamLogTypes.ExamLogLLM,
        })

        if (!examLogs) {
            throw new ValidationError('Exam logs not found')
        }

        return examLogs
    }
}

export default new ExamService()
