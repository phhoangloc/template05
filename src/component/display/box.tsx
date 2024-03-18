'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
type Props = {
    children: React.ReactNode,
    cn?: string,
    aspectRatio?: number,
    borderRadius?: string,
    bg?: boolean,
    boxShadow?: boolean
    onClick?: () => void
}

const Box = ({ children, cn, aspectRatio, bg, boxShadow, borderRadius, onClick }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()
    return (
        <div className={`${cn ? cn : "box"} ${bg ? currentTheme ? "background_light" : "background_dark" : ""} ${boxShadow ? "boxShadow" : ""}`}
            style={{ aspectRatio: aspectRatio ? aspectRatio : 1, borderRadius: borderRadius ? borderRadius : "5px" }}
            onClick={() => onClick && onClick()}
        >{children}</div>
    )
}

export default Box