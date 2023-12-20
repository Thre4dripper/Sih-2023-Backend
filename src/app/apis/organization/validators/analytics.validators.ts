import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import JoiValidator from '../../../utils/JoiValidator'

export const getAnalyticsValidator = async (req: Request, _res: Response, next: NextFunction) => {
    const schema = Joi.object({
        examId: Joi.number().required(),
    })
    JoiValidator.validate(req.query, schema, next)
}
