import { NextFunction, Request } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const SubmitExamQuesValidator = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        examId: Joi.number().required(),
        questionId: Joi.number().required(),
        options: Joi.array().items(Joi.number()).required(),
    })
    JoiValidator.validate(req.body, schema, next)
}