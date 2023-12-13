import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import organizationService from '../services/organization.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const loginOrganizationController= asyncHandler(
    async (req: any, res: any) => {
        const data = req.body
        const response = await organizationService.loginOrganization(data)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.ORGANIZATION_LOGGED_IN
        )
    }
)