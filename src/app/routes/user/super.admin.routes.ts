import express from 'express'
import { registerSuperAdminValidator } from '../../apis/super-admin/validators/register.super.admin.validator'
import { registerSuperAdminController } from '../../apis/super-admin/controllers/register.super.admin.controller'
import { loginSuperAdminValidator } from '../../apis/super-admin/validators/login.super.admin.validator'
import { loginSuperAdminController } from '../../apis/super-admin/controllers/login.super.admin.controller'

const router = express.Router()

router.post(
    '/api/v1/register-super-admin',
    registerSuperAdminValidator,
    registerSuperAdminController
)
router.post('/api/v1/login-super-admin', loginSuperAdminValidator, loginSuperAdminController)

export default router