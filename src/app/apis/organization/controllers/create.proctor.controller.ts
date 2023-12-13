import asyncHandler from '../../../utils/AsyncHandler'
import organizationService from '../services/organization.service'
import { ICreateProctor } from '../interfaces'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Response } from 'express'
import { UserRequest } from '../../../common/interfaces'

export const createProctorController = asyncHandler(
    async (req: UserRequest<{}, {}, ICreateProctor>, res: Response) => {
        const data = req.body
        const { id: organizationId } = req.user

        const response = await organizationService.createProctor({
            ...data,
            organizationId,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROCTOR_CREATED
        )
    }
)