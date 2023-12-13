import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import organizationService from '../services/organization.service'

export const registerOrganizationController = asyncHandler(
    async (req: any, res: any) => {
        const data = req.body
        const response = await organizationService.registerOrganization(data)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.ORGANIZATION_CREATED
        )
    }
)