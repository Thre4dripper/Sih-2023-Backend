import Joi from 'joi'
import { NextFunction } from 'express'
import JoiValidator from '../../../utils/JoiValidate'

export const createSuperAdminValidator = async (req: any, _res: any, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().optional(),
        profilePic: Joi.string().required(),
        address: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        zipCode: Joi.string().optional(),
        country: Joi.string().optional(),
    })
    JoiValidator.validate(req, schema, next)
}