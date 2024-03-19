'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
type Props = {
    children: React.ReactNode,
    cn?: string,
    sx?: {},
    bg?: boolean
    onClick?: () => void
}

const Box = ({ children, cn, sx, bg, onClick }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()
    return (
        <div className={`${cn ? cn : "box"} ${bg ? currentTheme ? "background_light" : "background_dark" : ""}`}
            style={sx}
            onClick={() => onClick && onClick()}
        >{children}</div>
    )
}

export default Box