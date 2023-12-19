import asyncHandler from '../../../utils/AsyncHandler'
import examService from '../services/exam.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { IStartExam } from '../interfaces'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Response } from 'express'
import { UserRequest } from '../../../common/interfaces'

export const startExamController = asyncHandler(
    async (req: UserRequest<{}, {}, IStartExam, {}>, res: Response) => {
        const data = req.body
        const { id: studentId } = req.user

        const response = await examService.startExam({
            ...data,
            studentId,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.EXAM_INITIATED
        )
    }
)