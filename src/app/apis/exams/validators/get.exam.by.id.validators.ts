import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const getExamByIdValidator = async (req: Request, _res: Response, next: NextFunction) => {
    const schema = Joi.object({
        examId: Joi.string().required(),
    })
    JoiValidator.validate(req.query, schema, next)
}
