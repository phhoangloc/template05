
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

export type UserLoginType = {
    _id: string,
    username: string,
    avata: any,
    background: any,
    email: string,
    position: string,
    pic: []
    carts: []
}

const UserReducer = createSlice({
    name: "User",
    initialState: {} as UserLoginType,
    reducers: {
        setUser: {
            reducer: (state: UserLoginType, action: PayloadAction<UserLoginType>) => {
                return (state = action.payload)
            },
            prepare: (msg: UserLoginType) => {
                return {
                    payload: msg
                }
            }
        }
    }
})

export const { actions, reducer } = UserReducer
export const { setUser } = actions;

export default UserReducer