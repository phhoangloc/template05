import React, { useEffect, useState } from 'react'
import "../style/style.css"
import Button from './button'
type Props = {
    func?: (e: boolean) => void
    save?: () => void
}

const Toogle = ({ func, save }: Props) => {
    const [value, setValue] = useState<boolean>(false)
    useEffect(() => {

    })
    return (
        <div className='toogle'>
            <div className="toogle_control">
                {value ? <div className='toogle_button true' onClick={() => { setValue(false); func && func(false) }}></div> : <div className='toogle_button' onClick={() => { setValue(true); func && func(true) }}></div>}
            </div>
            {value ? <p onClick={() => { setValue(false), func && func(false), save && save() }} >{save ? "save" : null}</p> : null}
        </div>
    )
}

export default Toogle