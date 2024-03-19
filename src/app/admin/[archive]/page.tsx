'use client'
import { AdminAuthen } from '@/action/AdminAuthen'
import NotFound from '@/app/not-found'
import Login from '@/component/auth/login'
import Signup from '@/component/auth/signup'
import Archive from '@/component/display/archive'
import Grid from '@/component/display/grid'

import React, { useEffect, useState } from 'react'

type Props = {
    params: { archive: string }
}


const page = ({ params }: Props) => {

    switch (params.archive) {
        case "login":
            return <Archive><Login /></Archive>
        case "signup":
            return <Archive><Signup /></Archive>
        case "chat":
        case "product":
        case "photo":
            return <Archive>{params.archive}</Archive>
        case "blog":
        case "watch":
            return <Archive>
                <div className="archive_header">
                    header
                </div>
                <Grid archive={params.archive} view='item' />
            </Archive>

    }

    return (
        <NotFound />
    )
}
export default page