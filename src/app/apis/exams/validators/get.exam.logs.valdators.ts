import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const getExamLogsOfStudentValidator = async (req: Request, _res: Response, next: NextFunction) => {
    const schema = Joi.object({
        studentId: Joi.string().required(),
        examId: Joi.string().required(),
    })
    JoiValidator.validate(req.query, schema, next)
}
