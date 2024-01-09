import IUser from "./user"

export type LoginResp = {
    data: {
        token: string
        user: IUser & {
            _id: string
        },
    },
    status: string
}