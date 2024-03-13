import React from 'react'
import store from '@/redux/store'
import { useState } from 'react'
import { AlertType, setAlert } from '@/redux/reducer/alertReducer'

const AlertModal = () => {

    const [alert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)


    const update = () => {
        store.subscribe(() => setCurrentAlert(store.getState().alert))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    return (
        <div className={` notice ${currentTheme ? "background_light" : "background_dark"} ${alert.open ? "notice_open" : ""}`}>
            <p>{alert.msg}<span onClick={() => store.dispatch(setAlert({ value: true, open: false, msg: "" }))}>yes</span><span onClick={() => store.dispatch(setAlert({ value: false, open: false, msg: "" }))}>no</span></p>
        </div>
    )
}

export default AlertModal