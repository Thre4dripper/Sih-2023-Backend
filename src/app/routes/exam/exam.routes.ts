import express from 'express'
import { verifyOrganization } from '../../middlewares/UserAuth'
import { createExamController } from '../../apis/exams/controllers/create.exams.controller'
import { createExaminationValidator } from '../../apis/exams/validators/create.exam.validators'
import { createExamQuestionsController } from '../../apis/exams/controllers/create.exams.questions.controller'
import { createExamQuestionValidator } from '../../apis/exams/validators/create.exam.question.validators'
const router = express.Router()

router.post(
    '/api/v1/create-exam',
    verifyOrganization,
    createExaminationValidator,
    createExamController
)

router.post(
    '/api/v1/create-exam-questions',
    verifyOrganization,
    createExamQuestionValidator,
    createExamQuestionsController
)

export default router
