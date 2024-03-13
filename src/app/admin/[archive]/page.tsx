import React from 'react'
import Archive from '@/component/display/archive'
import NotFound from '@/app/not-found'
import Login from '@/component/auth/login'
import Signup from '@/component/auth/signup'

type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {
    switch (params.archive) {
        case "auth":
        case "chat":
        case "blog":
        case "product":
        case "photo":
            return (
                <Archive>{params.archive}</Archive>
            )
        case "profile":
            return (
                <Archive>{params.archive}</Archive>
            )
        case "login":
            return (
                <Archive><Login /></Archive>
            )
        case "signup":
            return (
                <Archive><Signup /></Archive>
            )
    }
    return <NotFound />
}

export default page