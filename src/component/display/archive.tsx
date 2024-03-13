'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
import "../style/style.css"

type Props = {
    children: React.ReactNode
}

const Archive = ({ children }: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()

    return (
        <div className={`archive ${currentMenu ? "archive_open" : ""}`}>{children}</div>
    )
}

export default Archive