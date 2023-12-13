import Joi from 'joi'
import { NextFunction } from 'express'
import JoiValidator from '../../../utils/JoiValidate'

export const createSuperAdminValidator = async (req: any, _res: any, next: NextFunction) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
    })
    JoiValidator.validate(req, schema, next)
}