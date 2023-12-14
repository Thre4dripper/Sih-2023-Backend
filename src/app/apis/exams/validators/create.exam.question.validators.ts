import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'
import { QuestionTypes } from '../../../enums/QuestionTypes'

export const createExamQuestionValidator = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        question: Joi.string().required(),
        description: Joi.string().required(),
        questionType: Joi.string()
            .valid(...Object.values(QuestionTypes))
            .required(),
        marks: Joi.number().required(),
        negativeMarks: Joi.number().required(),
        examId: Joi.number().required(),
        options: Joi.array().items(
            Joi.object({
                option: Joi.string().required(),
                isCorrect: Joi.boolean().required(),
            })
        ),
    })
    JoiValidator.validate(req.body, schema, next)
}
