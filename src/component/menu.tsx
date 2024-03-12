'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LockIcon from '@mui/icons-material/Lock';
import store from '@/redux/store';
import "./style/style.css"

type props = {
    admin?: boolean
}
const Menu = ({ admin }: props) => {
    const toPage = useRouter()

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()

    if (admin) {
        const menus = [
            {
                name: "Dashboard",
                icon: <DashboardIcon />,
                link: "/admin/"
            },
            {
                name: "Auth",
                icon: <LockIcon />,
                link: "/admin/auth"
            }
        ]


        return (
            <div className={`menu ${currentMenu ? "menuOpen" : ""}`}>{
                menus.map((item: any, index: number) =>
                    <div className='item' key={index} onClick={() => toPage.push(item.link)}>
                        {item.icon}
                        <p className='title'>{item.name}</p>
                    </div>
                )
            }</div>
        )
    }

    return (
        <div className='menu'>menu home</div>
    )
}


export default Menu