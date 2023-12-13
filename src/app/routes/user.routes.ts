import express from 'express'
import { createSuperAdminController } from '../apis/super-admin/controllers/create.super.admin.controller'
import { createSuperAdminValidator } from '../apis/super-admin/validators/create.super.admin.validator'

const router = express.Router()

router.post('/api/v1/create-super-admin', createSuperAdminValidator, createSuperAdminController)

export default router