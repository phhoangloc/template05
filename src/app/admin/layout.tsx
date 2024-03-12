import React from 'react'
import header from '@/component/header'
import Menu from '@/component/menu'
import Header from '@/component/header'
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