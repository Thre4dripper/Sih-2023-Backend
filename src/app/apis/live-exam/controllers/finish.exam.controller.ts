import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Response } from 'express'
import { UserRequest } from '../../../common/interfaces'
import liveExamService from '../services/live.exam.service'

export const finishExamController = asyncHandler(
    async (req: UserRequest<{}, {}, { examId: number }, {}>, res: Response) => {
        const data = req.body
        const { id: studentId } = req.user

        const response = await liveExamService.finishExam({
            ...data,
            studentId,
        })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.EXAM_FINISHED
        )
    }
)