import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import questionService from '../services/question.service'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const GetAllExamsQuestionsController = asyncHandler(async (req: any, res: any) => {
    const data = req.body

    const { examId, limit, offset } = data
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
})
