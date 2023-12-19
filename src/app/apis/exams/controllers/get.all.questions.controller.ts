import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import questionService from '../services/question.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Response } from 'express'
import { UserRequest } from '../../../common/interfaces'

export const getAllQuestionsController = asyncHandler(
    async (
        req: UserRequest<
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
        const { id: organizationId } = req.user

        const response = await questionService.getAllExamQuestions({
            examId,
            organizationId,
            limit,
            offset,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_ALL_EXAM_QUESTIONS
        )
    }
)
