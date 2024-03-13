import React, { useState } from 'react'
import "../style/style.css"
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
type Props = {
    data: any[],
    modalOpen?: boolean,
    cn?: string,
    sx?: {},
    closeModal?: () => void
}

const Divider = ({ data, cn, sx, modalOpen, closeModal }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const toPage = useRouter()
    return (
        <div className={`divider 
        ${modalOpen ? "dividerOpen" : ""}
        ${currentTheme ? "background_light" : "background_dark"} 
        ${cn ? cn : ""}`} style={sx}>{
                data.map((item, index) =>
                    <div className='item' key={index}
                        onClick={() => { item?.link && toPage.push(item?.link); item?.func && item.func(); closeModal && closeModal() }}>
                        {item?.icon ? item?.icon : null}<p>{item.name}</p>
                    </div>)
            }</div>
    )
}

export default Divider