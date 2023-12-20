import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import examService from '../services/exam.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Response } from 'express'
import { UserRequest } from '../../../common/interfaces'

export const getExamLogsOfStudentController = asyncHandler(
    async (
        req: UserRequest<
            {},
            {},
            {},
            {
                studentId: number
                examId: number
            }
        >,
        res: Response
    ) => {
        const { studentId, examId } = req.query

        const response = await examService.getExamLogs(studentId, examId)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.EXAM_LOGS_FETCHED
        )
    }
)
