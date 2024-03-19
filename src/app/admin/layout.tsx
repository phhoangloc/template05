import React from 'react'
import Menu from '@/component/display/menu'
import Header from '@/component/display/header'
import ValidateAdmin from '@/component/validate/validateAdmin'
type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {

    return (
        <div className='admin'>
            <Header admin />
            <div className="main">
                <Menu admin />
                <ValidateAdmin>{children}</ValidateAdmin>
            </div>
        </div>
    )
}

export default layout