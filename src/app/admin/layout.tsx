import React from 'react'
import Menu from '@/component/display/menu'
import Header from '@/component/display/header'
type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {

    return (
        <div className='admin'>
            <Header admin />
            <div className="main">
                <Menu admin />
                {children}
            </div>
        </div>
    )
}

export default layout