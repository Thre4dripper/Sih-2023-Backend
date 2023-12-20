import asyncHandler from '../../../utils/AsyncHandler'
import { UserRequest } from '../../../common/interfaces'
import analyticsService from '../../exams/services/analytics.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { StatusCodes } from '../../../enums/StatusCodes'
import { Response } from 'express'

export const getAnalyticsController = asyncHandler(
    async (req: UserRequest<{}, {}, {}, { examId: number }>, res: Response) => {
        const { id: organizationId } = req.user
        const { examId } = req.query

        const response = await analyticsService.getExamAnalytics(examId, organizationId)

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.EXAM_ANALYTICS_FETCHED
        )
    }
)
