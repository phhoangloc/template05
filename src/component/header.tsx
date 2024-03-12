'use client'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import "./style/style.css"
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { setTheme } from '@/redux/reducer/ThemeReduce';
type Props = {
    admin?: boolean
}

const Header = ({ admin }: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    if (admin) {

        return (
            <div className='header'>
                {currentMenu ? <MenuOpenIcon onClick={() => store.dispatch(setMenu(false))} /> : <MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
                <h1>Admin</h1>
                <div className="icons">
                    {currentTheme ? <LightModeIcon onClick={() => store.dispatch(setTheme(false))} /> : <DarkModeIcon onClick={() => store.dispatch(setTheme(true))} />}
                </div>
            </div>
        )
    }

    return (
        <div>Home</div>
    )
}

export default Header 