import { ValidationError } from '../../../middlewares/CustomErrorHandler'
import { ICreateSuperAdmin, ILoginSuperAdmin } from '../interface'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import superAdminRepository from '../repositories/super.admin.repository'
import { Roles } from '../../../enums/Roles'
import EncryptionUtil from '../../../utils/EncryptionUtil'

class SuperAdminService {
    async findSuperAdminByEmail(email: string) {
        return superAdminRepository.findSuperAdmin({ email })
    }

    async createSuperAdmin(data: ICreateSuperAdmin) {
        const superAdmin = await this.findSuperAdminByEmail(data.email)

        if (superAdmin) {
            throw new ValidationError(ErrorMessages.SUPER_ADMIN_ALREADY_EXISTS)
        }

        data.role = Roles.SUPER_ADMIN
        data.password = await EncryptionUtil.hashPassword(data.password)
        const result = await superAdminRepository.createSuperAdmin(data)
        return {
            ...result.toJSON(),
            accessTokens: EncryptionUtil.generateJwtTokens(result.toJSON()),
        }
    }

    async loginSuperAdmin(data: ILoginSuperAdmin) {
        const superAdmin = await this.findSuperAdminByEmail(data.email)

        if (!superAdmin) {
            throw new ValidationError(ErrorMessages.SUPER_ADMIN_NOT_FOUND)
        }

        const isPasswordValid = await EncryptionUtil.comparePassword(
            data.password,
            superAdmin.password
        )

        if (!isPasswordValid) {
            throw new ValidationError(ErrorMessages.INVALID_CREDENTIALS)
        }

        return {
            ...superAdmin.toJSON(),
            accessTokens: EncryptionUtil.generateJwtTokens(superAdmin.toJSON()),
        }
    }
}

export default new SuperAdminService()