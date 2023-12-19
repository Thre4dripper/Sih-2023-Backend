import { NextFunction, Response } from 'express'
import asyncHandler from '../utils/AsyncHandler'
import { ValidationError } from '../handlers/CustomErrorHandler'
import { ErrorMessages } from '../enums/ErrorMessages'
import EncryptionUtil from '../utils/EncryptionUtil'
import User from '../models/user.model'
import { Roles } from '../enums/Roles'
import { UserRequest } from '../common/interfaces'

const verifyToken = (req: UserRequest<{}, {}, {}, {}>) => {
    const header = req.headers.authorization

    const token = header?.split(' ')[1]
    if (!token) {
        throw new ValidationError(ErrorMessages.INVALID_TOKEN)
    }
    // Verify token
    // If token is valid, set req.user = user
    let user = null
    try {
        user = EncryptionUtil.verifyToken(token) as User
    } catch (err) {
        console.log(err)
        throw new ValidationError(ErrorMessages.INVALID_TOKEN)
    }

    if (!user.email) {
        throw new ValidationError(ErrorMessages.INVALID_TOKEN)
    }
    return user
}

export const verifySuperAdmin = asyncHandler(
    async (req: UserRequest<{}, {}, {}, {}>, _res: Response, next: NextFunction) => {
        const user = verifyToken(req)

        if (user.role !== Roles.SUPER_ADMIN) {
            throw new ValidationError(ErrorMessages.INVALID_USER)
        }

        req.user = user
        next()
    }
)

export const verifyOrganization = asyncHandler(
    async (req: UserRequest<{}, {}, {}, {}>, _res: Response, next: NextFunction) => {
        const user = verifyToken(req)

        if (user.role !== Roles.ORGANIZATION) {
            throw new ValidationError(ErrorMessages.INVALID_USER)
        }

        req.user = user
        next()
    }
)

export const verifyProctor = asyncHandler(
    async (req: UserRequest<{}, {}, {}, {}>, _res: Response, next: NextFunction) => {
        const user = verifyToken(req)

        if (user.role !== Roles.PROCTOR) {
            throw new ValidationError(ErrorMessages.INVALID_USER)
        }

        req.user = user
        next()
    }
)

export const verifyStudent = asyncHandler(
    async (req: UserRequest<{}, {}, {}, {}>, _res: Response, next: NextFunction) => {
        const user = verifyToken(req)

        if (user.role !== Roles.STUDENT) {
            throw new ValidationError(ErrorMessages.INVALID_USER)
        }

        req.user = user
        next()
    }
)

export const verifyOrgAndProctor = asyncHandler(
    async (req: UserRequest<{}, {}, {}, {}>, _res: Response, next: NextFunction) => {
        const user = verifyToken(req)

        if (user.role !== Roles.ORGANIZATION && user.role !== Roles.PROCTOR) {
            throw new ValidationError(ErrorMessages.INVALID_USER)
        }

        req.user = user
        next()
    }
)