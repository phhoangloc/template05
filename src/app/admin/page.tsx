'use client'
import Archive from '@/component/display/archive'
import React from 'react'
import { useState } from 'react'
import { AlertType } from '@/redux/reducer/alertReducer'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
const page = () => {
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentAlert(store.getState().alert))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()
    return (
        <Archive>
            {currentUser?.position}
        </Archive>
    )

}

export default page