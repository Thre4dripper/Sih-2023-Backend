import express from 'express'
import { registerStudentValidator } from '../../apis/student/validators/register.student.validator'
import { registerStudentController } from '../../apis/student/controllers/register.student.controller'
import { loginStudentValidator } from '../../apis/student/validators/login.student.validator'
import { loginStudentController } from '../../apis/student/controllers/login.student.controller'

const router = express.Router()

router.post('/api/v1/register-student', registerStudentValidator, registerStudentController)
router.post('/api/v1/login-student', loginStudentValidator, loginStudentController)

export default router