import asyncHandler from '../../../utils/AsyncHandler'
import { Response } from 'express'
import { UserRequest } from '../../../common/interfaces'
import proctorService from '../services/proctor.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const getAllProctorsController = asyncHandler(
    async (req: UserRequest<{}, {}, {}, { limit: number; offset: number }>, res: Response) => {
        const { limit, offset } = req.query
        const { id: organizationId } = req.user

        const response = await proctorService.getAllProctors({
            limit,
            offset,
            organizationId,
        })

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_ALL_PROCTORS
        )
    }
)