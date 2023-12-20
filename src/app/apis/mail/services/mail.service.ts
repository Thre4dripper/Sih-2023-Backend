import path from 'path'
import fs from 'fs/promises'
import globalEmailService from '../../../common/email.service'
import { IExamMail } from '../interfaces'
import examService from '../../exams/services/exam.service'
import studentService from '../../student/services/student.service'
import organizationService from '../../organization/services/organization.service'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import mailRepository from '../../organization/repositories/mail.repository'

class MailService {
    async sendExamMail(data: IExamMail) {
        const { examId, organizationId, studentIds } = data

        let [exam, organization, students] = await Promise.all([
            examService.getExamById(examId, organizationId),
            organizationService.getOrganizationById(organizationId),
            studentService.getAllStudents({
                limit: studentIds.length,
                offset: 0,
                organizationId,
            }),
        ])

        exam = exam.toJSON()
        organization = organization.toJSON()

        if (!organization) {
            throw new ValidationError(ErrorMessages.ORGANIZATION_NOT_FOUND)
        }

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        if (!students || students.rows.length === 0) {
            throw new ValidationError(ErrorMessages.STUDENT_NOT_FOUND)
        }

        const htmlPath = path.join(__dirname, '..', '..', '..', 'views', 'exam-mail.html')

        const examMailHtml = await fs.readFile(htmlPath, 'utf8')

        const organizationName = organization.name
        const examName = exam.name
        const examDate = exam.startTime.getDate()
        const examStartTime = exam.startTime
        const examEndTime = new Date(exam.startTime).setMinutes(exam.startTime.getMinutes())

        const duration = exam.duration
        const numberOfQuestions = exam.totalQuestions
        const type = exam.examType

        let html = examMailHtml
            .toString()
            .replace(new RegExp(/_ORGANIZATION_NAME_/g), organizationName)
            .replace(new RegExp(/_EXAM_NAME_/g), examName)
            .replace(new RegExp(/_EXAM_DATE_/g), examDate.toString())
            .replace(new RegExp(/_EXAM_START_TIME_/g), examStartTime.toString())
            .replace(new RegExp(/_EXAM_END_TIME_/g), examEndTime.toString())
            .replace(new RegExp(/_DURATION_/g), duration.toString())
            .replace(new RegExp(/_NUMBER_OF_QUESTIONS_/g), numberOfQuestions.toString())
            .replace(new RegExp(/_TYPE_/g), type)
            .replace(new RegExp(/_EXAM_LINK_/g), `http://localhost:5173/exams/${examId}/start/`)

        const mailPromises = students.rows.map((student) => {
            return globalEmailService.sendEmail(student.toJSON().email, html)
        })

        const mailResponses = await Promise.all(mailPromises)

        for (let i = 0; i < studentIds.length; i++) {
            await mailRepository.create({
                examId:examId,
                studentId: studentIds[i],
                isMailSent: true,
            })
        }

        return { success: true, mailResponses }
    }
}

export default new MailService()
