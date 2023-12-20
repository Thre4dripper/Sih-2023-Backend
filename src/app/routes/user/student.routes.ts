import express from 'express'
import { registerStudentValidator } from '../../apis/student/validators/register.student.validator'
import { registerStudentController } from '../../apis/student/controllers/register.student.controller'
import { loginStudentValidator } from '../../apis/student/validators/login.student.validator'
import { loginStudentController } from '../../apis/student/controllers/login.student.controller'
import { verifyOrgAndProctor } from '../../middlewares/UserAuth'
import { getAllStudentsValidator } from '../../apis/student/validators/get.all.students.validator'
import { getAllStudentController } from '../../apis/student/controllers/get.all.student.controller'

const router = express.Router()

router.post('/api/v1/register-student', registerStudentValidator, registerStudentController)
router.post('/api/v1/login-student', loginStudentValidator, loginStudentController)
router.get(
    '/api/v1/get-all-students',
    verifyOrgAndProctor,
    getAllStudentsValidator,
    getAllStudentController
)
export default router