import React, { useEffect, useRef, useState } from 'react'
import '../style/style.css'
import store from '@/redux/store'
type Props = {
    onChange: (e: string) => void,
    name: string,
    value: string
}

const TextArea = ({ onChange, name, value }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const inputRef = useRef<HTMLDivElement | null>(null)

    const [focus, setFocus] = useState<boolean>(false)

    useEffect(() => {
        inputRef.current ? inputRef.current.innerHTML = value : null
    }, [inputRef.current, value])

    return (
        <div className={`textarea ${focus || inputRef.current?.innerHTML || value ? "textarea_focus" : ""}`}>
            <p className={`name ${focus || inputRef.current?.innerHTML || value ? "name_focus" : ""}`} >{name}</p>
            <div ref={inputRef} className="input_box" contentEditable={true}
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            >
            </div>
        </div >
    )
}

export default TextArea