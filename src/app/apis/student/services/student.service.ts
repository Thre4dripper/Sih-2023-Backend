import { ILoginStudent } from '../interfaces'
import studentRepository from '../repositories/student.repository'
import { Roles } from '../../../enums/Roles'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import EncryptionUtil from '../../../utils/EncryptionUtil'
import organizationRepository from '../../organization/repositories/organization.repository'
import { verifyAadhaar, verifyPan } from '../../../utils/AadharValidator'

class StudentService {
    async registerStudent(data: any) {
        const organization = await organizationRepository.find({
            id: data.organizationId,
        })

        if (!organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_NOT_FOUND)
        }

        const student = await studentRepository.find({
            email: data.email,
            role: Roles.STUDENT,
            organizationId: data.organizationId,
        })

        if (student) {
            throw new ValidationError(ErrorMessages.STUDENT_ALREADY_EXISTS)
        }
        const { aadharNumber, panNumber } = data
        if (aadharNumber) {
            const aadharValidate = await verifyAadhaar(aadharNumber.toString())
            console.log(aadharValidate)
            if (aadharValidate === 'INVALID_AADHAAR_NUMBER') {
                throw new ValidationError(ErrorMessages.INVALID_AADHAR_NUMBER)
            }
        }
        if (panNumber) {
            const panNumberValidate = await verifyPan(panNumber.toString())
            if (panNumberValidate === 'INVALID_PAN_NUMBER') {
                throw new ValidationError(ErrorMessages.INVALID_PAN_NUMBER)
            }
            console.log(panNumberValidate)
        }

        data.role = Roles.STUDENT
        data.organizationId = organization.id
        data.password = await EncryptionUtil.hashPassword(data.password)
        const result = await studentRepository.create(data)

        return {
            ...result.toJSON(),
            accessTokens: EncryptionUtil.generateJwtTokens(result.toJSON()),
        }
    }

    async loginStudent(data: ILoginStudent) {
        const organization = await organizationRepository.find({
            id: data.organizationId,
        })

        if (!organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_NOT_FOUND)
        }

        const student = await studentRepository.find({
            email: data.email,
            role: Roles.STUDENT,
            organizationId: data.organizationId,
        })

        if (!student) {
            throw new ValidationError(ErrorMessages.STUDENT_NOT_FOUND)
        }

        if(student.isVerified === 0){
            throw new ValidationError(ErrorMessages.STUDENT_NOT_VERIFIED)
        }

        const isPasswordValid = await EncryptionUtil.comparePassword(
            data.password,
            student.password
        )

        if (!isPasswordValid) {
            throw new ValidationError(ErrorMessages.INVALID_CREDENTIALS)
        }

        return {
            ...student.toJSON(),
            accessTokens: EncryptionUtil.generateJwtTokens(student.toJSON()),
        }
    }

    async getAllStudents(data: { limit: number; offset: number; organizationId: number }) {
        const { limit, offset, organizationId } = data
        return studentRepository.getAllStudents(limit, offset, organizationId)
    }

    async getAllStudentsByIds(studentIds: number[]) {
        return studentRepository.findAll({
            id: studentIds,
        })
    }

    async getStudentProfile(studentId: number) {
        return studentRepository.find({
            id: studentId,
        })
    }
}

export default new StudentService()
