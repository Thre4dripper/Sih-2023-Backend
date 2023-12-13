import asyncHandler from '../../../utils/AsyncHandler'
import { ILoginUser, UserRequest } from '../../../common/interfaces'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import proctorService from '../services/proctor.service'
import { Response } from 'express'

export const loginProctorController = asyncHandler(
    async (req: UserRequest<{}, {}, ILoginUser>, res: Response) => {
        const data = req.body
        const response = await proctorService.loginProctor(data)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROCTOR_CREATED
        )
    }
)