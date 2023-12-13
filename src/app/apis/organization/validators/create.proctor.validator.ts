import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidate from '../../../utils/JoiValidate'

export const createProctorValidator = (req: Request, _res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().optional(),
        organizationId: Joi.number().required(),
    })
    JoiValidate.validate(req, schema, next)
}