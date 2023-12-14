import proctorRepository from '../repositories/proctor.repository'
import { Roles } from '../../../enums/Roles'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import EncryptionUtil from '../../../utils/EncryptionUtil'
import { IGetAllProctors, ILoginProctor } from '../interfaces'

class ProctorService {
    async loginProctor(data: ILoginProctor) {
        const proctor = await proctorRepository.find({
            email: data.email,
            role: Roles.PROCTOR,
            organizationId: data.organizationId,
        })

        if (!proctor) {
            throw new ValidationError(ErrorMessages.PROCTOR_NOT_FOUND)
        }

        const isPasswordValid = await EncryptionUtil.comparePassword(
            data.password,
            proctor.password
        )

        if (!isPasswordValid) {
            throw new ValidationError(ErrorMessages.INVALID_CREDENTIALS)
        }

        return {
            ...proctor.toJSON(),
            accessTokens: EncryptionUtil.generateJwtTokens(proctor.toJSON()),
        }
    }

    async getAllProctors(data: IGetAllProctors) {
        const { limit, offset, organizationId } = data

        return proctorRepository.getAllProctors(limit, offset, organizationId)
    }
}

export default new ProctorService()