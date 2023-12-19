import asyncHandler from '../../../utils/AsyncHandler'
import questionService from '../services/question.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Response } from 'express'
import { ICreateQuestion } from '../interfaces'
import { UserRequest } from '../../../common/interfaces'

export const createExamQuestionsController = asyncHandler(
    async (req: UserRequest<{}, {}, ICreateQuestion, {}>, res: Response) => {
        const data = req.body

        const { question, description, questionType, marks, negativeMarks, examId, options } = data
        const { id: organizationId } = req.user
        const response = await questionService.createExamQuestions({
            question,
            description,
            questionType,
            marks,
            negativeMarks,
            examId,
            options,
            organizationId,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.EXAM_QUESTION_CREATED
        )
    }
)
