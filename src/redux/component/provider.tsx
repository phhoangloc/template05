'use client'
import React, { useState, useEffect, useRef } from 'react'
import store from '../store'
import Scrollbar from '@/component/display/scrollbar'
import NoticeModal from '@/component/notice/noticeModal'
import { UserAuthen } from '@/action/UserAuthen'
import { UserLoginType, setUser } from '../reducer/UserReduce'
import Loading from '@/app/loading'
import AlertModal from '@/component/notice/alertModal'

type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)
    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))
    }

    update()

    const [loading, setLoading] = useState<boolean>(true)

    const checkLogin = async () => {
        const result = await UserAuthen.checkLogin()
        if (result.success) {
            const _id = result.data._id
            const username = result.data.username
            const email = result.data.email
            const avata = result.data.avata
            const background = result.data.background
            const position = result.data.position
            const pic = result.data.pic
            const carts = result.data.carts
            store.dispatch(setUser({ _id, username, email, avata, background, position, pic, carts }))
            setLoading(false)
        } else {
            store.dispatch(setUser(undefined))
            setLoading(false)
        }
    }

    useEffect(() => {
        checkLogin()
    }, [currentRefresh])

    const scroll: any = useRef()
    const [scrollTop, setScrollTop] = useState<number>(0)
    const [scrollHeight, setScrollHeight] = useState<number>(0)
    const [onScroll, setOnScroll] = useState<boolean>(false)

    const getScroll = () => {
        setOnScroll(true)
        setScrollTop(scroll.current?.scrollTop)
        setScrollHeight(scroll.current?.scrollHeight)
        setTimeout(() => setOnScroll(false), 1000)

    }

    return (
        <div className={`provider ${currentTheme ? "light" : "dark"}`} ref={scroll} onScroll={() => getScroll()} >
            <NoticeModal />
            <AlertModal />
            {loading ? <Loading /> : children}
            <Scrollbar scrTop={scrollTop} scrHeight={scrollHeight} onScroll={onScroll} />
        </div>

    )
}

export default Provider