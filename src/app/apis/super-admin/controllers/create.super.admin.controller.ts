import { Request, Response } from 'express'

export const createSuperAdminController = async (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Hello World!',
    })
}