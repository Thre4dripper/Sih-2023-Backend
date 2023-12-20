import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import examService from '../services/exam.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { UserRequest } from '../../../common/interfaces'
import { Response } from 'express'
import { Roles } from '../../../enums/Roles'

export const getAllExamController = asyncHandler(
    async (req: UserRequest<{}, {}, {}, { limit: number; offset: number }>, res: Response) => {
        const { limit, offset } = req.query

        let { id: organizationId, role } = req.user

        if (role === Roles.PROCTOR) {
            organizationId = req.user.organizationId
        }
        const response = await examService.getAllExams({
            limit: Number(limit),
            offset: Number(offset),
            organizationId,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_ALL_EXAMS
        )
    }
)
