import asyncHandler from '../../../utils/AsyncHandler'
import { Request, Response } from 'express'
import { ILoginStudent } from '../interfaces'
import studentService from '../services/student.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const loginStudentController = asyncHandler(
    async (req: Request<{},{},ILoginStudent>, res: Response) => {
        const data = req.body

        const response = await studentService.loginStudent(data)

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.STUDENT_LOGGED_IN
        )
    }
)