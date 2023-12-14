import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'
import { QuestionTypes } from '../../../enums/QuestionTypes'

export const createExaminationValidator = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.number().required(),
        startTime: Joi.date().required(),
        passingMarks: Joi.number().required(),
        totalQuestions: Joi.number().required(),
        examType: Joi.string()
            .valid(...Object.values(QuestionTypes))
            .required()
    })
    JoiValidator.validate(req.body, schema, next)
}
