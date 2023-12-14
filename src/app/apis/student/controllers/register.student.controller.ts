import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import studentService from '../services/student.service'
import { Request, Response } from 'express'
import { IRegisterStudent } from '../interfaces'

export const registerStudentController = asyncHandler(
    async (req: Request<{}, {}, IRegisterStudent>, res: Response) => {
        const data = req.body

        const response = await studentService.registerStudent(data)

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.STUDENT_REGISTERED
        )
    }
)