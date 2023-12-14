import asyncHandler from '../../../utils/AsyncHandler'
import { ILoginUser } from '../../../common/interfaces'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import proctorService from '../services/proctor.service'
import { Request, Response } from 'express'

export const loginProctorController = asyncHandler(
    async (req: Request<{}, {}, ILoginUser>, res: Response) => {
        const data = req.body
        const response = await proctorService.loginProctor(data)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROCTOR_LOGGED_IN
        )
    }
)