import asyncHandler from '../../../utils/AsyncHandler'
import questionService from '../services/question.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const createExamQuestionsController = asyncHandler(async (req: any, res: any) => {
    const data = req.body

    const { question, description, questionType, marks, negativeMarks, examId, options } = data

    console.log(options)

    const response = await questionService.createExamQuestions(
        {
            question,
            description,
            questionType,
            marks,
            negativeMarks,
            examId,
        },
        { options }
    )
    return new ResponseBuilder(
        res,
        StatusCodes.SUCCESS,
        response,
        SuccessMessages.EXAM_QUESTION_CREATED
    )
})
