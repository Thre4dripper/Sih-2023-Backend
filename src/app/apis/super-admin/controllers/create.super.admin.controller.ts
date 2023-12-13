import { Request, Response } from 'express'
import { StatusCodes } from '../../../enums/StatusCodes'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import superAdminService from '../services/super.admin.service'
import asyncHandler from '../../../utils/AsyncHandler'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const createSuperAdminController = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body

    const superAdmin = await superAdminService.createSuperAdmin(data)
    return new ResponseBuilder(
        res,
        StatusCodes.SUCCESS,
        superAdmin,
        SuccessMessages.SUPER_ADMIN_CREATED
    )
})