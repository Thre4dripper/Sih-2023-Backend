import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import JoiValidator from '../../../utils/JoiValidator'

export const registerSuperAdminValidator = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
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
    JoiValidator.validate(req.body, schema, next)
}