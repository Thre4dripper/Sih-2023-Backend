import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import examService from '../services/exam.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Response } from 'express'
import { UserRequest } from '../../../common/interfaces'

export const getExamByIdController = asyncHandler(
    async (
        req: UserRequest<
            {},
            {},
            {},
            {
                examId: number
            }
        >,
        res: Response
    ) => {
        // const { id: organizationId } = req.user

        const { examId } = req.query

        const response = await examService.getExamById(examId, 0)
        return new ResponseBuilder(res, StatusCodes.SUCCESS, response, SuccessMessages.EXAM_FETCHED)
    }
)
