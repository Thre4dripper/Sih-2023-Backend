import { ILoginUser, IRegisterUser } from '../../common/interfaces'

export interface IRegisterStudent extends IRegisterUser {
    organizationId: number
    aadharNumber: string
}

export interface ILoginStudent extends ILoginUser {
    organizationId: number
}