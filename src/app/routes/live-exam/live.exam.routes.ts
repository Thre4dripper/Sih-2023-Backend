import express from 'express'
import { verifyStudent } from '../../middlewares/UserAuth'
import { submitExamQuesController } from '../../apis/live-exam/controllers/submit.exam.ques.controller'

const router = express.Router()

router.post(
    '/api/v1/live-exam/submit-question',
    verifyStudent,
    submitExamQuesController,
    submitExamQuesController
)

export default router