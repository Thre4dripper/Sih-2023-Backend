import asyncHandler from '../../../utils/AsyncHandler'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import proctorService from '../services/proctor.service'
import { Request, Response } from 'express'

export const verifyStudentController = asyncHandler(
    async (
        req: Request<
            {},
            {},
            {
                studentId: number
            },
            {}
        >,
        res: Response
    ) => {
        const data = req.body
        const { studentId } = data
        const response = await proctorService.verifyStudent({ studentId })
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.STUDENT_VERIFIED_SUCCESSFULLY
        )
    }
)
