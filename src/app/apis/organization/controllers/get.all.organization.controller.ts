import asyncHandler from '../../../utils/AsyncHandler'
import { UserRequest } from '../../../common/interfaces'
import organizationService from '../services/organization.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { StatusCodes } from '../../../enums/StatusCodes'
import { Response } from 'express'

export const getAllOrganizationController = asyncHandler(
    async (req: UserRequest<{}, {}, {}, { limit: number; offset: number }>, res: Response) => {
        const { limit, offset } = req.query

        const response = await organizationService.getAllOrganizations({
            limit: Number(limit),
            offset: Number(offset),
        })

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_ALL_ORGANIZATIONS
        )
    }
)