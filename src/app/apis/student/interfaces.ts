import { ILoginUser, IRegisterUser } from '../../common/interfaces'

export interface IRegisterStudent extends IRegisterUser {
    organizationId: number
}

export interface ILoginStudent extends ILoginUser {
    organizationId: number
}