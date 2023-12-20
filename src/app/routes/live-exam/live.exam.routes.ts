import express from 'express'
import { verifyStudent } from '../../middlewares/UserAuth'
import { submitExamQuesController } from '../../apis/live-exam/controllers/submit.exam.ques.controller'
import { startFinishExamValidator } from '../../apis/live-exam/validators/start.finish.exam.validators'
import { startExamController } from '../../apis/live-exam/controllers/start.exam.controller'
import { finishExamController } from '../../apis/live-exam/controllers/finish.exam.controller'
import { getLiveExamQuesController } from '../../apis/live-exam/controllers/get.live.exam.ques.controller'
import { getLiveExamQuesValidator } from '../../apis/live-exam/validators/get.live.exam.ques.validator'

const router = express.Router()

router.post(
    '/api/v1/live-exam/start-exam',
    verifyStudent,
    startFinishExamValidator,
    startExamController
)

router.get(
    '/api/v1/live-exam/get-questions',
    verifyStudent,
    getLiveExamQuesValidator,
    getLiveExamQuesController
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