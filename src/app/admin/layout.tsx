import React from 'react'
import Menu from '@/component/display/menu'
import Header from '@/component/display/header'
import Validate from '@/component/validate/validate'
type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {

    return (
        <div className='admin'>
            <Header admin />
            <div className="main">
                <Menu admin />
                <Validate>
                    {children}
                </Validate>
            </div>
        </div>
    )
}

export default layout