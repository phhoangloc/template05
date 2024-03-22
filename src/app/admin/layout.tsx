import React from 'react'
import Menu from '@/component/display/menu'
import Header from '@/component/display/header'
import ValidateUser from '@/component/validate/validateUser'
type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {

    return (
        <div className='admin'>
            <Header admin />
            <div className="main">
                <Menu admin />
                <ValidateUser>
                    {children}
                </ValidateUser>
            </div>
        </div>
    )
}

export default layout