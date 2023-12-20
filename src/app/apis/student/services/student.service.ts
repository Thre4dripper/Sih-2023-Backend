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
        const panNumberValidate = await verifyPan(panNumber.toString())
        const aadharValidate = await verifyAadhaar(aadharNumber.toString())
        console.log(panNumberValidate)
        if (panNumberValidate === 'INVALID_PAN_NUMBER') {
            throw new ValidationError(ErrorMessages.INVALID_PAN_NUMBER)
        }
        console.log(aadharValidate)
        if (aadharValidate === 'INVALID_AADHAAR_NUMBER') {
            throw new ValidationError(ErrorMessages.INVALID_AADHAR_NUMBER)
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

    async getStudentProfile(studentId: number) {
        return studentRepository.find({
            id: studentId,
        })
    }
}

export default new StudentService()
