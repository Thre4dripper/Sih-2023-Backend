import asyncHandler from '../../../utils/AsyncHandler'
import questionService from '../services/question.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Request, Response } from 'express'
import { ICreateQuestion } from '../interfaces'

export const createExamQuestionsController = asyncHandler(
    async (req: Request<{}, {}, ICreateQuestion>, res: Response) => {
        const data = req.body

        const { question, description, questionType, marks, negativeMarks, examId, options } = data

        const response = await questionService.createExamQuestions({
            question,
            description,
            questionType,
            marks,
            negativeMarks,
            examId,
            options,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.EXAM_QUESTION_CREATED
        )
    }
)
