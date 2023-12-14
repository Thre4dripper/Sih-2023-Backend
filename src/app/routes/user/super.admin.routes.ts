import express from 'express'
import { registerSuperAdminValidator } from '../../apis/super-admin/validators/register.super.admin.validator'
import { registerSuperAdminController } from '../../apis/super-admin/controllers/register.super.admin.controller'
import { loginSuperAdminValidator } from '../../apis/super-admin/validators/login.super.admin.validator'
import { loginSuperAdminController } from '../../apis/super-admin/controllers/login.super.admin.controller'
import { getAllStudentsValidator } from '../../apis/student/validators/get.all.students.validator'
import { getAllStudentController } from '../../apis/student/controllers/get.all.student.controller'
import { verifyOrganization } from '../../middlewares/UserAuth'

const router = express.Router()

router.post(
    '/api/v1/register-super-admin',
    registerSuperAdminValidator,
    registerSuperAdminController
)
router.post('/api/v1/login-super-admin', loginSuperAdminValidator, loginSuperAdminController)
router.get(
    '/api/v1/get-all-students',
    verifyOrganization,
    getAllStudentsValidator,
    getAllStudentController
)

export default router