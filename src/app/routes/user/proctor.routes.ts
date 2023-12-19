import express from 'express'
import { loginProctorValidator } from '../../apis/proctor/validators/login.proctor.validator'
import { loginProctorController } from '../../apis/proctor/controllers/login.proctor.controller'
import { verifyOrganization, verifyProctor } from '../../middlewares/UserAuth'
import { getAllProctorsValidator } from '../../apis/proctor/validators/get.all.proctors.validator'
import { getAllProctorsController } from '../../apis/proctor/controllers/get.all.proctors.controller'
import { verifyStudentValidator } from '../../apis/proctor/validators/verify.student.validator'
import { verifyStudentController } from '../../apis/proctor/controllers/verify.student.controller'

const router = express.Router()

router.post('/api/v1/login-proctor', loginProctorValidator, loginProctorController)
router.get(
    '/api/v1/get-all-proctors',
    verifyOrganization,
    getAllProctorsValidator,
    getAllProctorsController
)
router.post(
    '/api/v1/verify-student',
    verifyProctor,
    verifyStudentValidator,
    verifyStudentController
)

export default router
