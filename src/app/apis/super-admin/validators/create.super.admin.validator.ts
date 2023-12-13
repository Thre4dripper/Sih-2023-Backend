import Joi from 'joi'
import { ValidationError } from '../../middlewares/CustomErrorHandler'
import { NextFunction } from 'express'

export const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
})

export const createSuperAdminValidator = async (data: any, next: NextFunction) => {
    try {
        const value = await schema.validateAsync(data)
        console.log(value)
    } catch (err: any) {
        throw new ValidationError(err.message)
    }
}