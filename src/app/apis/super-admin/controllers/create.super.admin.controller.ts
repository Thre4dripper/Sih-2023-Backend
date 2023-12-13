import { Request, Response } from 'express'
import { StatusCodes } from '../../../enums/StatusCodes'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import superAdminService from '../services/super.admin.service'
import asyncHandler from '../../../utils/AsyncHandler'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { ICreateSuperAdmin } from '../interface'

export const createSuperAdminController = asyncHandler(
    async (req: Request<{}, {}, ICreateSuperAdmin>, res: Response) => {

        const data = req.body
        const response = await superAdminService.createSuperAdmin(data)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.SUPER_ADMIN_CREATED
        )
    }
)