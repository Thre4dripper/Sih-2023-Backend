import asyncHandler from '../../../utils/AsyncHandler'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import proctorService from '../services/proctor.service'
import { Request, Response } from 'express'
import { ILoginProctor } from '../interfaces'

export const loginProctorController = asyncHandler(
    async (req: Request<{}, {}, ILoginProctor>, res: Response) => {
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