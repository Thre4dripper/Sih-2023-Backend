import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'
import { ExamTypes } from '../../../enums/ExamTypes'

export const createExamValidator = async (
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
            .valid(...Object.values(ExamTypes))
            .required()
    })
    JoiValidator.validate(req.body, schema, next)
}
