import asyncHandler from '../../../utils/AsyncHandler'
import { UserRequest } from '../../../common/interfaces'
import { Response } from 'express'
import studentService from '../services/student.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export const getStudentProfileController = asyncHandler(
    async (req: UserRequest<{}, {}, {}, {}>, res: Response) => {
        const { id } = req.user

        const response = await studentService.getStudentProfile(id)

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_STUDENT_PROFILE
        )
    }
)