import { Request, Response } from 'express'
import asyncHandler from '../../../utils/AsyncHandler'
import superAdminService from '../services/super.admin.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { ILoginUser } from '../../../common/interfaces'

export const loginSuperAdminController = asyncHandler(
    async (req: Request<{}, {}, ILoginUser>, res: Response) => {
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