import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const startExamValidator = async (req: Request, _res: Response, next: NextFunction) => {
    const schema = Joi.object({
        examId: Joi.number().required(),
        activities: Joi.object().required(),
    })
    JoiValidator.validate(req.body, schema, next)
}
