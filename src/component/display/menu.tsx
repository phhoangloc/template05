'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LockIcon from '@mui/icons-material/Lock';
import store from '@/redux/store';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AppsIcon from '@mui/icons-material/Apps';
import ForumIcon from '@mui/icons-material/Forum';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhotoIcon from '@mui/icons-material/Photo';
import "../style/style.css"

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

    const [i, setI] = useState<number>(-1)

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
                children: [
                    {
                        name: "Log In",
                        icon: <LoginIcon />,
                        link: "/login"
                    },
                    {
                        name: "Sign Up",
                        icon: <ShoppingCartIcon />,
                        link: "/signup"
                    }
                ]
            },
        ]
        const apps = [
            {
                name: "Ecommerce",
                icon: <AppsIcon />,
                children: [
                    {
                        name: "chat",
                        icon: <ForumIcon />,
                        link: "/chat"
                    },
                    {
                        name: "Blog",
                        icon: <ArticleIcon />,
                        link: "/admin/blog"
                    },
                    {
                        name: "Ecommerce",
                        icon: <ShoppingCartIcon />,
                        link: "/admin/product"
                    },
                    {
                        name: "Picture",
                        icon: <PhotoIcon />,
                        link: "/admin/phôtp"
                    }
                ]
            }]
        return (
            <div className={`menu ${currentMenu ? "menuOpen" : ""}`}>
                {
                    menus.map((item: any, index: number) =>
                        <div key={index}>
                            <div className='item' key={index} onClick={() => { item.link && toPage.push(item.link), setI(index) }}>
                                {item.icon}
                                <p className='title'>{item.name}</p>
                            </div>
                            {
                                index === i && item?.children?.map((child: any, index_2: number) =>
                                    <div className='item child' key={index_2} onClick={() => { child.link && toPage.push(child.link) }}>
                                        {child.icon}
                                        <p className='title'>{child.name}</p>
                                    </div>
                                )

                            }
                        </div>
                    )

                }
                <p>app</p>
                {
                    apps.map((item: any, index: number) =>
                        <div key={index}>
                            <div className='item' key={index} onClick={() => { item.link && toPage.push(item.link), setI(index) }}>
                                {item.icon}
                                <p className='title'>{item.name}</p>
                            </div>
                            {
                                index === i && item?.children?.map((child: any, index_2: number) =>
                                    <div className='item child' key={index_2} onClick={() => { child.link && toPage.push(child.link) }}>
                                        {child.icon}
                                        <p className='title'>{child.name}</p>
                                    </div>
                                )

                            }
                        </div>
                    )

                }
            </div>
        )
    }

    return (
        <div className='menu'>menu home</div>
    )
}


export default Menu