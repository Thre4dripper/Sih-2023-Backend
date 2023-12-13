export interface IAccessToken {
    accessToken: string
    refreshToken: string
}
export interface IRegisterUser {
    name: string
    email: string
    password: string
    phone: string
    role: string
    profilePic: string
    address: string
    city: string
    state: string
    country: string
    zipCode: string
}

export interface ILoginUser {
    email: string
    password: string
}