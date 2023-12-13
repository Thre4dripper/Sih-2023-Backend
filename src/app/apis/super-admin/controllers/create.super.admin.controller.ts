import { Request, Response } from 'express'
import { StatusCodes } from '../../../enums/StatusCodes'
import ResponseBuilder from '../../../utils/ResponseBuilder'

export const createSuperAdminController = async (req: Request, res: Response) => {
    const data = req.body

    return new ResponseBuilder(res, StatusCodes.SUCCESS, data, 'Super Admin Created')
}