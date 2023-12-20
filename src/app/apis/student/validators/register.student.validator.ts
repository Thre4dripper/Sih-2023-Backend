import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const registerStudentValidator = async (
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
        organizationId: Joi.number().required(),
        aadharNumber: Joi.number().min(12).required(),
        panPic: Joi.string().required(),
        panNumber: Joi.string().required(),
        aadharPic: Joi.string().required(),
        address: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        zipCode: Joi.string().optional(),
        country: Joi.string().optional(),
    })
    JoiValidator.validate(req.body, schema, next)
}
