'use client'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import "../style/style.css"
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import { UserLoginType } from '@/redux/reducer/UserReduce';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';
import Divider from './divider';
import { AlertType, setAlert } from '@/redux/reducer/alertReducer';
import { useRouter } from 'next/navigation';
type Props = {
    admin?: boolean
}

const Header = ({ admin }: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }

    update()

    const toPage = useRouter()
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const Logout = () => {
        store.dispatch(setAlert({ value: false, open: true, msg: "bạn có muốn log out không" }))
    }
    useEffect(() => {
        currentAlert.value && localStorage.clear()
        currentAlert.value && toPage.push("/admin")
    }, [currentAlert.value])
    if (admin) {

        return (
            <div className='header'>
                {currentMenu ? <MenuOpenIcon onClick={() => store.dispatch(setMenu(false))} /> : <MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
                <h1>Admin</h1>
                <div className="icons">
                    {currentUser?.avata?.name ?
                        <Image src={process.env.google_url + currentUser?.avata?.name} alt='avata' width={500} height={500} onClick={() => setModalOpen(!modalOpen)} /> :
                        <PersonIcon onClick={() => setModalOpen(true)} />}
                    {<Divider
                        data={currentUser?._id ? [{ name: "Profile", link: "/admin/profile" }, { name: "Log Out", func: () => Logout() }] : [{ name: "Log In", link: "/login" }, { name: "Sign Up", link: "signup" }]}
                        sx={{ position: "absolute", top: 55, right: 5, zIndex: 2 }}
                        modalOpen={modalOpen}
                        closeModal={() => setModalOpen(false)} />}
                    {currentTheme ? <DarkModeIcon onClick={() => store.dispatch(setTheme(false))} /> : <LightModeIcon onClick={() => store.dispatch(setTheme(true))} />}
                </div>
            </div>
        )
    }

    return (
        <div>Home</div>
    )
}

export default Header 