import asyncHandler from '../../../utils/AsyncHandler'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { StatusCodes } from '../../../enums/StatusCodes'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { Response } from 'express'
import { UserRequest } from '../../../common/interfaces'
import examLogService from '../services/exam.log.service'

export const generateLlmController = asyncHandler(
    async (
        req: UserRequest<
            {},
            {},
            {
                examId: number
                studentId: number
            },
            {}
        >,
        res: Response
    ) => {
        const { examId, studentId } = req.body

        const response = await examLogService.fetchExamLogs(examId, studentId)

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_ALL_EXAM_QUESTIONS
        )
    }
)