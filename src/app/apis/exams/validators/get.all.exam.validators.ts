import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const getAllExamValidator = async (req: Request, _res: Response, next: NextFunction) => {
    const schema = Joi.object({
        limit: Joi.number().required(),
        offset: Joi.number().required(),
    })
    JoiValidator.validate(req.body, schema, next)
}
