import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import JoiValidate from '../../../utils/JoiValidate'

export const removeProctorValidator = (req: Request, _res: Response, next: NextFunction) => {
    const schema = Joi.object({
        proctorId: Joi.number().required(),
    })
    JoiValidate.validate(req, schema, next)
}