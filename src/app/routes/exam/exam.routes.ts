import express from 'express'
import { verifyOrganization } from '../../middlewares/UserAuth'
import { createExamController } from '../../apis/exams/controllers/create.exams.controller'
import { createExaminationValidator } from '../../apis/exams/validators/create.exam.validators'
import { createExamQuestionsController } from '../../apis/exams/controllers/create.exam.questions.controller'
import { createExamQuestionValidator } from '../../apis/exams/validators/create.exam.question.validators'
import { GetAllExamsQuestionsController } from '../../apis/exams/controllers/get.all.questions.controller'
import { getAllExamQuestionValidator } from '../../apis/exams/validators/get.all.exam.questions.validaors'
import { getAllExamController } from '../../apis/exams/controllers/get.all.exam.controller'
import { getAllExamValidator } from '../../apis/exams/validators/get.all.exam.validators'

const router = express.Router()

router.post(
    '/api/v1/create-exam',
    verifyOrganization,
    createExaminationValidator,
    createExamController
)

router.post(
    '/api/v1/create-exam-question',
    verifyOrganization,
    createExamQuestionValidator,
    createExamQuestionsController
)

router.get(
    '/api/v1/get-all-exam-questions',
    verifyOrganization,
    getAllExamQuestionValidator,
    GetAllExamsQuestionsController
)

router.get('/api/v1/get-all-exams', verifyOrganization, getAllExamValidator, getAllExamController)

export default router
