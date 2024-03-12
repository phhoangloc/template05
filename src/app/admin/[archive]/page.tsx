import React from 'react'
import Archive from '@/component/archive'
type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {
    return (
        <Archive>{params.archive}</Archive>
    )
}

export default page