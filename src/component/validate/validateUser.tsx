"use client"
import React, { useState } from 'react'
import store from '@/redux/store'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import Archive from '../display/archive'
type Props = {
    children: React.ReactNode
}

const ValidateUser = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    if (currentUser && (currentUser?.position === "user" || currentUser?.position === "admin")) { return children } return <Archive>you dont have permission to access this page</Archive>
}

export default ValidateUser