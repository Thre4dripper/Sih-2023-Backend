import { ILoginUser } from '../../common/interfaces'

export interface ILoginProctor extends ILoginUser {
    organizationId: number
}

export interface IGetAllProctors {
    limit: number
    offset: number
    organizationId: number
}