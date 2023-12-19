import { ICreateExam } from '../interfaces'
import examRepository from '../repositories/exam.repository'
import examLogsRepository from '../repositories/exam.logs.repository'
import organizationRepository from '../../organization/repositories/organization.repository'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import { ValidationError } from '../../../handlers/CustomErrorHandler'

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

        const examData = await examLogsRepository.findAndCountAll(examId, limit, offset)

        if (!examData) {
            throw new ValidationError('Something went wrong')
        }

        return examData
    }

    async getExamLogs(studentId: number, organizationId: number,examId:number) {
        const examLogs = await examLogsRepository.findAll({
            studentId,
            examId,
        })

        if (!examLogs) {
            throw new ValidationError('Exam logs not found')
        }

        return examLogs
    }
}

export default new ExamService()
