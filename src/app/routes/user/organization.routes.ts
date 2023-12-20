import express from 'express'
import { registerOrganizationController } from '../../apis/organization/controllers/register.organization.controller'
import { loginOrganizationController } from '../../apis/organization/controllers/login.organization.controller'
import { loginOrganizationValidator } from '../../apis/organization/validators/login.organization.validator'
import { registerOrganizationValidator } from '../../apis/organization/validators/register.organization.validator'
import { createProctorValidator } from '../../apis/organization/validators/create.proctor.validator'
import { createProctorController } from '../../apis/organization/controllers/create.proctor.controller'
import { removeProctorValidator } from '../../apis/organization/validators/remove.proctor.validator'
import { removeProctorController } from '../../apis/organization/controllers/remove.proctor.controller'
import { verifyOrganization, verifySuperAdmin } from '../../middlewares/UserAuth'
import { getAllOrganizationController } from '../../apis/organization/controllers/get.all.organization.controller'
import { getAllOrganizationsValidator } from '../../apis/organization/validators/get.all.organizations.validator'
import { getAnalyticsController } from '../../apis/organization/controllers/get.analytics.controller'
import { getAnalyticsValidator } from '../../apis/organization/validators/analytics.validators'

const router = express.Router()

router.post(
    '/api/v1/register-organization',
    registerOrganizationValidator,
    registerOrganizationController
)
router.post('/api/v1/login-organization', loginOrganizationValidator, loginOrganizationController)
router.post(
    '/api/v1/create-proctor',
    verifyOrganization,
    createProctorValidator,
    createProctorController
)
router.post(
    '/api/v1/remove-proctor',
    verifyOrganization,
    removeProctorValidator,
    removeProctorController
)
router.get(
    '/api/v1/get-all-organizations',
    verifySuperAdmin,
    getAllOrganizationsValidator,
    getAllOrganizationController
)

router.get(
    '/api/v1/get-analytics',
    verifyOrganization,
    getAnalyticsValidator,
    getAnalyticsController
)

export default router
