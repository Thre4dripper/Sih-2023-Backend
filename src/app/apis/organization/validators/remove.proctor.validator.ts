import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidator from '../../../utils/JoiValidator'

export const removeProctorValidator = (req: Request, _res: Response, next: NextFunction) => {
    const schema = Joi.object({
        proctorId: Joi.number().required(),
    })
    JoiValidator.validate(req, schema, next)
}