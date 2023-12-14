import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const loginOrganizationValidator = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    JoiValidator.validate(req, schema, next)
}
