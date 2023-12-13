import Joi from 'joi'
import { NextFunction } from 'express'

export const createSuperAdminValidator = async (req: any, _res: any, next: NextFunction) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
    })
    const data = req.body
    const { error } = schema.validate(data)

    if (error) {
        next(error)
        return
    }

    next()
}