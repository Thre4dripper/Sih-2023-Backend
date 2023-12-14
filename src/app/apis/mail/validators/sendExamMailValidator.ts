import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const sendExamMailValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        examId: Joi.number().required(),
        studentIds: Joi.array().items(Joi.number()).required(),
    })
    JoiValidator.validate(req.body, schema, next)
}