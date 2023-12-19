import { ICreateExam } from '../interfaces'
import examRepository from '../repositories/exam.repository'
import examLogsRepository from '../repositories/exam.logs.repository'
import organizationRepository from '../../organization/repositories/organization.repository'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'

class examService {
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
        const result = await examRepository.findOne({
            where: {
                id: examId,
            },
        })

        if (!result) {
            throw new ValidationError('Exam not found')
        }

        console.log(examId, organizationId)

        if (result.organizationId !== organizationId) {
            throw new ValidationError('Exam not found')
        }

        return result
    }

    async updateExam(data: ICreateExam) {
        const { id, organizationId } = data
        const exam = await examRepository.findOne({
            where: {
                id,
            },
        })

        if (!exam) {
            throw new ValidationError('Exam not found')
        }

        if (exam.organizationId !== organizationId) {
            throw new ValidationError('Exam not found')
        }

        return await examRepository.update(data)
    }

    async startExam(data: { examId: number; studentId: number; activities: JSON }) {
        const { examId, studentId, activities } = data

        const exam = await examRepository.findOne({
            where: {
                id: examId,
            },
        })

        const examLogData = await examLogsRepository.findOne({
            examId,
            studentId,
        })

        if (examLogData) {
            throw new ValidationError('Exam already started')
        }

        if (!exam) {
            throw new ValidationError('Exam not found')
        }

        if (exam.startTime > new Date()) {
            throw new ValidationError('Exam not started yet')
        }

        const examLog = await examLogsRepository.create({
            examId,
            studentId,
            activities,
            logType: ExamLogTypes.ExamStarted,
        })

        if (!examLog) {
            throw new ValidationError('Something went wrong')
        }

        return examLog
    }

    async getAllStudentByExamId(data: { examId: number; limit: number; offset: number }) {
        const { examId, limit, offset } = data

        const exam = await examRepository.findOne({
            where: {
                id: examId,
            },
        })

        if (!exam) {
            throw new ValidationError('Exam not found')
        }

        const examData = await examLogsRepository.findAll(examId, limit, offset)

        if (!examData) {
            throw new ValidationError('Something went wrong')
        }

        return examData
    }
}

export default new examService()
