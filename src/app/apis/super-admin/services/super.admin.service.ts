import { ValidationError } from '../../../middlewares/CustomErrorHandler'
import { ICreateSuperAdmin } from '../interface'
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
        const result = await superAdminRepository.createSuperAdmin(data)
        return {
            ...result.toJSON(),
            accessTokens: EncryptionUtil.generateJwtTokens(result.toJSON()),
        }
    }
}

export default new SuperAdminService()