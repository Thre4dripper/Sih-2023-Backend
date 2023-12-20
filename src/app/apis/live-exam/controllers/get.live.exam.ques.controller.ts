import asyncHandler from '../../../utils/AsyncHandler'
import { UserRequest } from '../../../common/interfaces'
import liveExamService from '../services/live.exam.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { Response } from 'express'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const getLiveExamQuesController = asyncHandler(
    async (req: UserRequest<{}, {}, {}, { examId: number }>, res: Response) => {
        const { examId } = req.query
        const { id, organizationId } = req.user

        const response = await liveExamService.getQuestions({
            examId,
            studentId: id,
            organizationId,
        })

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_ALL_EXAM_QUESTIONS
        )
    }
)