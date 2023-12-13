import express from 'express'
import { createSuperAdminController } from '../apis/super-admin/controllers/create.super.admin.controller'
import { createSuperAdminValidator } from '../apis/super-admin/validators/create.super.admin.validator'
import { loginSuperAdminController } from '../apis/super-admin/controllers/login.super.admin.controller'
import { loginSuperAdminValidator } from '../apis/super-admin/validators/login.super.admin.validator'

const router = express.Router()

router.post('/api/v1/create-super-admin', createSuperAdminValidator, createSuperAdminController)
router.post('/api/v1/login-super-admin', loginSuperAdminValidator, loginSuperAdminController)

export default router