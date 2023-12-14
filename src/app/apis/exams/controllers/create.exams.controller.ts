import asyncHandler from '../../../utils/AsyncHandler'
import examService from '../services/exam.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { ICreateExam } from '../interfaces'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Response } from 'express'
import { UserRequest } from '../../../common/interfaces'

export const createExamController = asyncHandler(
    async (req: UserRequest<{}, {}, ICreateExam, {}>, res: Response) => {
        const data = req.body
        const { id: organizationId } = req.user

        const response = await examService.createExam({
            ...data,
            organizationId,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.EXAM_CREATED
        )
    }
)