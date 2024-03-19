"use client"
import React, { useState } from 'react'
import store from '@/redux/store'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import Archive from '../display/archive'
type Props = {
    children: React.ReactNode
}

const ValidateAdmin = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    return currentUser?.position === "admin" ? children : <Archive>you dont have permission to access this page</Archive>
}

export default ValidateAdmin