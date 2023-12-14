import express from 'express'
import { verifyOrganization } from '../../middlewares/UserAuth'
import { createExamController } from '../../apis/exams/controllers/create.exams.controller'
import { createExamValidator } from '../../apis/exams/validators/create.exam.validators'
import { createExamQuestionsController } from '../../apis/exams/controllers/create.exam.questions.controller'
import { createExamQuestionValidator } from '../../apis/exams/validators/create.exam.question.validators'
import { getAllQuestionsController } from '../../apis/exams/controllers/get.all.questions.controller'
import { getAllExamQuestionValidator } from '../../apis/exams/validators/get.all.exam.questions.validaors'
import { getAllExamController } from '../../apis/exams/controllers/get.all.exam.controller'
import { getAllExamValidator } from '../../apis/exams/validators/get.all.exam.validators'
import { deleteQuestionByIdController } from '../../apis/exams/controllers/delete.exam.controller'
import { deleteQuestionValidator } from '../../apis/exams/validators/delete.exam.validators'
import { getExamByIdController } from '../../apis/exams/controllers/get.exam.by.id.controller'
import { getExamByIdValidator } from '../../apis/exams/validators/get.exam.by.id.validators'

const router = express.Router()

router.post(
    '/api/v1/create-exam',
    verifyOrganization,
    createExamValidator,
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
    getAllQuestionsController
)

router.get('/api/v1/get-all-exams', verifyOrganization, getAllExamValidator, getAllExamController)

router.get(
    '/api/v1/get-exam-by-id',
    verifyOrganization,
    getExamByIdValidator,
    getExamByIdController
)

router.delete(
    '/api/v1/delete-exam-question',
    verifyOrganization,
    deleteQuestionValidator,
    deleteQuestionByIdController
)

export default router
