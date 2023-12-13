import { NextFunction } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidate'

export const loginSuperAdminValidator = async (req: any, _res: any, next: NextFunction) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    JoiValidator.validate(req, schema, next)
}