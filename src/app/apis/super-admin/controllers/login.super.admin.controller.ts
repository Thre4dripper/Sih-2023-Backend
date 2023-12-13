import { Request, Response } from 'express'
import asyncHandler from '../../../utils/AsyncHandler'
import { ILoginSuperAdmin } from '../interface'
import superAdminService from '../services/super.admin.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const loginSuperAdminController = asyncHandler(
    async (req: Request<{}, {}, ILoginSuperAdmin>, res: Response) => {
        const data = req.body
        const response = await superAdminService.loginSuperAdmin(data)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.SUPER_ADMIN_LOGGED_IN
        )
    }
)