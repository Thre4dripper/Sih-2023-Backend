import asyncHandler from '../../../utils/AsyncHandler'
import { Response } from 'express'
import organizationService from '../services/organization.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { UserRequest } from '../../../common/interfaces'

export const removeProctorController = asyncHandler(
    async (req: UserRequest<{}, {}, { proctorId: number }>, res: Response) => {
        const { proctorId } = req.body
        const { id: organizationId } = req.user

        const response = await organizationService.removeProctor(proctorId, organizationId)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROCTOR_REMOVED
        )
    }
)