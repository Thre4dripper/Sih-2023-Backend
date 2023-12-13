import express from 'express'
import { loginProctorValidator } from '../../apis/proctor/validators/login.proctor.validator'
import { loginProctorController } from '../../apis/proctor/controllers/login.proctor.controller'

const router = express.Router()

router.post('/api/v1/login-proctor', loginProctorValidator, loginProctorController)

export default router