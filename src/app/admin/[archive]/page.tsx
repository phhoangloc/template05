import React from 'react'
import Archive from '@/component/display/archive'
import NotFound from '@/app/not-found'
type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {
    switch (params.archive) {
        case "auth":
            return (
                <Archive>{params.archive}</Archive>
            )
        case "profile":
            return (
                <Archive>{params.archive}</Archive>
            )
    }
    return <NotFound />
}

export default page