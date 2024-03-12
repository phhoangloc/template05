'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
type Props = {
    children: React.ReactNode,
    cn?: string,
    aspectRatio?: number,
    bg?: boolean,
    boxShadow?: boolean
}

const Box = ({ children, cn, aspectRatio, bg, boxShadow }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()
    return (
        <div className={`${cn ? cn : "box"} ${bg ? currentTheme ? "background_light" : "background_dark" : ""} ${boxShadow ? "boxShadow" : ""}`}
            style={{ aspectRatio: aspectRatio ? aspectRatio : 1 }}
        >{children}</div>
    )
}

export default Box