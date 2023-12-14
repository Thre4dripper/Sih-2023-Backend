import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import questionService from '../services/question.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const deleteQuestionByIdController = asyncHandler(async (req: any, res: any) => {
    const { id: organizationId } = req.user

    const data = req.body

    const { questionId } = data

    const response = await questionService.deleteQuestion({
        questionId,
        organizationId,
    })
    return new ResponseBuilder(res, StatusCodes.SUCCESS, response, SuccessMessages.EXAM_FETCHED)
})
