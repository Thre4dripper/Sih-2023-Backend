import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import questionService from '../services/question.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Request, Response } from 'express'

export const getAllQuestionsController = asyncHandler(
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
        const response = await questionService.getAllExamQuestions({
            examId,
            limit,
            offset,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_ALL_EXAMS
        )
    }
)
