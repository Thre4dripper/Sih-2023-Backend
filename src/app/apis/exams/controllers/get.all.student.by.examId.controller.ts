import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import examService from '../services/exam.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Request, Response } from 'express'

export const getAllStudentsForExamController = asyncHandler(
    async (
        req: Request<
            {},
            {},
            {},
            {
                limit: number
                offset: number
                examId: number
            }
        >,
        res: Response
    ) => {

        const { examId, limit, offset } = req.query
        const response = await examService.getAllStudentByExamId({
            examId,
            limit,
            offset,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_ALL_STUDENTS
        )
    }
)
