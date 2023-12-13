import { IRegisterUser } from '../../../common/interfaces'
import organizationRepository from '../repositories/organization.repository'
import { ValidationError } from '../../../middlewares/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import { Roles } from '../../../enums/Roles'
import EncryptionUtil from '../../../utils/EncryptionUtil'
import { ICreateProctor } from '../interfaces'

class OrganizationService {
    async findOrganizationByEmail(email: string) {
        return organizationRepository.find({ email, role: Roles.ORGANIZATION })
    }

    async registerOrganization(data: IRegisterUser) {
        const organization = await this.findOrganizationByEmail(data.email)

        if (organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_ALREADY_EXISTS)
        }

        data.role = Roles.ORGANIZATION
        data.password = await EncryptionUtil.hashPassword(data.password)
        const result = await organizationRepository.create(data)
        return {
            ...result.toJSON(),
            accessTokens: EncryptionUtil.generateJwtTokens(result.toJSON()),
        }
    }

    async loginOrganization(data: IRegisterUser) {
        const organization = await this.findOrganizationByEmail(data.email)

        if (!organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_NOT_FOUND)
        }

        const isPasswordValid = await EncryptionUtil.comparePassword(
            data.password,
            organization.password
        )

        if (!isPasswordValid) {
            throw new ValidationError(ErrorMessages.INVALID_CREDENTIALS)
        }

        return {
            ...organization.toJSON(),
            accessTokens: EncryptionUtil.generateJwtTokens(organization.toJSON()),
        }
    }

    async createProctor(data: ICreateProctor) {
        const proctor = await organizationRepository.find({
            email: data.email,
            organizationId: data.organizationId,
            role: Roles.PROCTOR,
        })

        if (proctor) {
            throw new ValidationError(ErrorMessages.PROCTOR_ALREADY_EXISTS)
        }

        data.role = Roles.PROCTOR
        data.password = await EncryptionUtil.hashPassword(data.password)

        return organizationRepository.create(data)
    }

    async removeProctor(proctorId: number) {
        const proctor = await organizationRepository.find({
            id: proctorId,
            role: Roles.PROCTOR,
        })

        if (!proctor) {
            throw new ValidationError(ErrorMessages.PROCTOR_NOT_FOUND)
        }

        return organizationRepository.removeProctor(proctorId)
    }
}

export default new OrganizationService()