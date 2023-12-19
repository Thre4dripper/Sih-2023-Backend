import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const verifyStudentValidator = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        studentId: Joi.number().required(),
    })
    JoiValidator.validate(req.body, schema, next)
}