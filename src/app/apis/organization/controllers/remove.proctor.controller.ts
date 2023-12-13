import asyncHandler from '../../../utils/AsyncHandler'
import { Request, Response } from 'express'
import organizationService from '../services/organization.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const removeProctorController = asyncHandler(
    async (req: Request<{}, {}, { proctorId: number }>, res: Response) => {
        const { proctorId } = req.body
        const response = await organizationService.removeProctor(proctorId)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROCTOR_REMOVED
        )
    }
)