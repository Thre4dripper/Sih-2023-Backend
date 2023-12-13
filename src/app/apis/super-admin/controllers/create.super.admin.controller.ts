import { NextFunction, Request, Response } from 'express'
import { createSuperAdminValidator } from '../validators/create.super.admin.validator'

export const createSuperAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body

    try {
        await createSuperAdminValidator(data, next)
        return res.status(200).json({ message: 'Super Admin Created Successfully' })
    }
    catch (err: any) {
        next(err)
    }
}