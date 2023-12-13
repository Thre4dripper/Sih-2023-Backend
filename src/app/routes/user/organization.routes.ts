import express from 'express'
import { registerOrganizationController } from '../../apis/organization/controllers/register.organization.controller'
import { loginOrganizationController } from '../../apis/organization/controllers/login.organization.controller'
import { loginOrganizationValidator } from '../../apis/organization/validators/login.organization.validator'
import { registerOrganizationValidator } from '../../apis/organization/validators/register.organization.validator'

const router = express.Router()

router.post(
    '/api/v1/register-organization',
    registerOrganizationValidator,
    registerOrganizationController
)
router.post('/api/v1/login-organization', loginOrganizationValidator, loginOrganizationController)

export default router