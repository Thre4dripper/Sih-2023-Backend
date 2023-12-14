import { ICreateExam } from '../interfaces'
import examRepository from '../repositories/exam.repository'
import organizationRepository from '../../organization/repositories/organization.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'

class examService {
    async createExam(data: ICreateExam) {
        const organization = await organizationRepository.find({
            where: {
                id: data.organizationId,
            },
        })

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
}

export default new examService()
