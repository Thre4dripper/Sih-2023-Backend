import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const createProctorValidator = (req: Request, _res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().optional(),
    })
    JoiValidator.validate(req.body, schema, next)
}