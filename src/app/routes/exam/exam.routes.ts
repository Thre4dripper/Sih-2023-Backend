import express from 'express'
import { verifyOrgAndProctor, verifyOrganization, verifyStudent } from '../../middlewares/UserAuth'
import { createExamController } from '../../apis/exams/controllers/create.exams.controller'
import { createExamValidator } from '../../apis/exams/validators/create.exam.validators'
import { createExamQuestionsController } from '../../apis/exams/controllers/create.exam.questions.controller'
import { createExamQuestionValidator } from '../../apis/exams/validators/create.exam.question.validators'
import { getAllQuestionsController } from '../../apis/exams/controllers/get.all.questions.controller'
import { getAllExamQuestionValidator } from '../../apis/exams/validators/get.all.exam.questions.validaors'
import { getAllExamController } from '../../apis/exams/controllers/get.all.exam.controller'
import { getAllExamValidator } from '../../apis/exams/validators/get.all.exam.validators'
import { deleteQuestionByIdController } from '../../apis/exams/controllers/delete.exam.question.controller'
import { deleteQuestionValidator } from '../../apis/exams/validators/delete.exam.validators'
import { getExamByIdController } from '../../apis/exams/controllers/get.exam.by.id.controller'
import { getExamByIdValidator } from '../../apis/exams/validators/get.exam.by.id.validators'
import { updateExamController } from '../../apis/exams/controllers/update.exam.controller'
import { updateExamValidator } from '../../apis/exams/validators/update.exam.validators'
import { sendExamMailController } from '../../apis/mail/controllers/send.exam.mail.controller'
import { sendExamMailValidator } from '../../apis/mail/validators/sendExamMailValidator'
import { startExamValidator } from '../../apis/exams/validators/start.exam.validators'
import { startExamController } from '../../apis/exams/controllers/start.exam.controller'
import { getAllStudentByExamIdValidator } from '../../apis/exams/validators/get.all.student.by.examId.validators'
import { getAllStudentsForExamController } from '../../apis/exams/controllers/get.all.student.by.examId.controller'
import { getExamLogsOfStudentController } from '../../apis/exams/controllers/get.exam.logs.by.student.id.controller'
import { getExamLogsOfStudentValidator } from '../../apis/exams/validators/get.exam.logs.valdators'
const router = express.Router()

router.post('/api/v1/exam/create-exam', verifyOrganization, createExamValidator, createExamController)

router.post(
    '/api/v1/exam/create-exam-question',
    verifyOrganization,
    createExamQuestionValidator,
    createExamQuestionsController
)

router.get(
    '/api/v1/exam/get-all-exam-questions',
    verifyOrganization,
    getAllExamQuestionValidator,
    getAllQuestionsController
)

router.get(
    '/api/v1/exam/get-all-exams',
    verifyOrgAndProctor,
    getAllExamValidator,
    getAllExamController
)

router.get(
    '/api/v1/exam/get-exam-by-id',
    verifyOrganization,
    getExamByIdValidator,
    getExamByIdController
)

router.post(
    '/api/v1/exam/delete-exam-question',
    verifyOrganization,
    deleteQuestionValidator,
    deleteQuestionByIdController
)

router.post(
    '/api/v1/exam/update-exam',
    verifyOrganization,
    updateExamValidator,
    updateExamController
)

router.post(
    '/api/v1/send-exam-mail',
    verifyOrganization,
    sendExamMailValidator,
    sendExamMailController
)

router.post('/api/v1/exam/start-exam', verifyStudent, startExamValidator, startExamController)

router.get(
    '/api/v1/exam/get-all-students',
    verifyOrganization,
    getAllStudentByExamIdValidator,
    getAllStudentsForExamController
)

router.get(
    '/api/v1/exam/get-student-logs',
    verifyOrganization,
    getExamLogsOfStudentValidator,
    getExamLogsOfStudentController
)

export default router
