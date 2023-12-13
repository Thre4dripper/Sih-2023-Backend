import asyncHandler from '../../../utils/AsyncHandler'
import organizationService from '../services/organization.service'
import { ICreateProctor } from '../interfaces'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Request, Response } from 'express'

export const createProctorController = asyncHandler(
    async (req: Request<{}, {}, ICreateProctor>, res: Response) => {

        const data = req.body
        const response = await organizationService.createProctor(data)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROCTOR_CREATED
        )
    }
)