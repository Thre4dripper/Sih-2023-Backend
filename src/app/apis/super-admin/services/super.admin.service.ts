import { ValidationError } from '../../../middlewares/CustomErrorHandler'
import { ICreateSuperAdmin } from '../interface'
import { ErrorMessages } from '../../../enums/ErrorMessages'

class SuperAdminService {
    async findSuperAdminByEmail(email: string) {
        return email
    }
    async createSuperAdmin(data: ICreateSuperAdmin) {
        const superAdmin = await this.findSuperAdminByEmail(data.email)

        if(superAdmin) {
            throw new ValidationError(ErrorMessages.SUPER_ADMIN_ALREADY_EXISTS)
        }
        return data
    }
}

export default new SuperAdminService()