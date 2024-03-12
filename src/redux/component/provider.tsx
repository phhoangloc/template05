'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { UserLoginType, setUser } from '../reducer/UserReduce'



type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    // const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)
    // const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        // store.subscribe(() => setCurrentUser(store.getState().user))
        // store.subscribe(() => setCurrentRefresh(store.getState().refresh))
    }

    update()

    // const [loading, setLoading] = useState<boolean>(true)

    // const checkLogin = async () => {
    //     const result = await UserAuthen.checkLogin()
    //     if (result.success) {
    //         const _id = result.data._id
    //         const username = result.data.username
    //         const email = result.data.email
    //         const avata = result.data.avata
    //         const background = result.data.background
    //         const position = result.data.position
    //         const pic = result.data.pic
    //         const carts = result.data.carts
    //         store.dispatch(setUser({ _id, username, email, avata, background, position, pic, carts }))
    //     }
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     checkLogin()
    // }, [currentRefresh])

    return (

        <div className={`provider ${currentTheme ? "light" : "dark"}`}>
            {/* <NoticeModal />
            <AlertModal /> */}
            {children}
        </div>

    )
}

export default Provider