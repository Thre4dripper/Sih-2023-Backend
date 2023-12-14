import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import examService from '../services/exam.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const GetAllExamsController = asyncHandler(async (req: any, res: any) => {
    const data = req.body
    const { limit, offset } = data

    const { id: organizationId } = req.user

    const response = await examService.getAllExams({
        limit: Number(limit),
        offset: Number(offset),
        organizationId,
    })
    return new ResponseBuilder(
        res,
        StatusCodes.SUCCESS,
        response,
        SuccessMessages.EXAM_QUESTIONS_FETCHED
    )
})
