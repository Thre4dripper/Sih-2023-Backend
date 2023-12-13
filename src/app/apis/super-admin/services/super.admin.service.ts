import { ValidationError } from '../../../middlewares/CustomErrorHandler'
import { ICreateSuperAdmin } from '../interface'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import superAdminRepository from '../repositories/super.admin.repository'
import { Roles } from '../../../enums/Roles'

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
        return superAdminRepository.createSuperAdmin(data)
    }
}

export default new SuperAdminService()