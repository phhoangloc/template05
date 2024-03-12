import React from 'react'
import "../style/style.css"
type Props = {
    children: React.ReactNode,
}

const Grid = ({ children }: Props) => {
    return (
        <div className='grid_box'>{children}</div>
    )
}

export default Grid