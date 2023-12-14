import asyncHandler from '../../../utils/AsyncHandler'
import { UserRequest } from '../../../common/interfaces'
import { NextFunction, Response } from 'express'
import mailService from '../services/mail.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const sendExamMailController = asyncHandler(
    async (
        req: UserRequest<
            {},
            {},
            {
                examId: number
                studentIds: number[]
            },
            {}
        >,
        res: Response,
        next: NextFunction
    ) => {
        const data = req.body

        const { examId, studentIds } = data
        const { id: organizationId } = req.user

        const response = await mailService.sendExamMail({
            organizationId,
            examId,
            studentIds,
        })

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.EXAM_MAIL_SENT
        )
    }
)