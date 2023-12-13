import { IRegisterUser } from '../../../common/interfaces'
import organizationRepository from '../repositories/organization.repository'
import { ValidationError } from '../../../middlewares/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import { Roles } from '../../../enums/Roles'
import EncryptionUtil from '../../../utils/EncryptionUtil'

class OrganizationService {
    async findOrganizationByEmail(email: string) {
        return organizationRepository.findOrganization({ email })
    }
    async registerOrganization(data: IRegisterUser) {
        const organization = await this.findOrganizationByEmail(data.email)

        if(organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_ALREADY_EXISTS)
        }

        data.role = Roles.ORGANIZATION
        data.password = await EncryptionUtil.hashPassword(data.password)
        const result = await organizationRepository.createOrganization(data)
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
}

export default new OrganizationService()