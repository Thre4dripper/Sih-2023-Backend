import Joi from 'joi'
import { NextFunction } from 'express'

export default class JoiValidate {
    static validate(req: any, schema: Joi.ObjectSchema<any>, next: NextFunction) {
        const data = req.body
        const { error } = schema.validate(data)

        if (error) {
            next(error)
            return
        }

        next()
    }
}