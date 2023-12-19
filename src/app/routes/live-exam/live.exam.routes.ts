import express from 'express'
import { verifyStudent } from '../../middlewares/UserAuth'
import { submitExamQuesController } from '../../apis/live-exam/controllers/submit.exam.ques.controller'
import { startFinishExamValidator } from '../../apis/live-exam/validators/start.finish.exam.validators'
import { startExamController } from '../../apis/live-exam/controllers/start.exam.controller'
import { finishExamController } from '../../apis/live-exam/controllers/finish.exam.controller'

const router = express.Router()

router.post(
    '/api/v1/live-exam/start-exam',
    verifyStudent,
    startFinishExamValidator,
    startExamController
)

router.post(
    '/api/v1/live-exam/submit-question',
    verifyStudent,
    submitExamQuesController,
    submitExamQuesController
)

router.post(
    '/api/v1/live-exam/finish-exam',
    verifyStudent,
    startFinishExamValidator,
    finishExamController
)

export default router