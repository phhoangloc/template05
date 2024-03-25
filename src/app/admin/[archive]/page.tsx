'use client'
import NotFound from '@/app/not-found'
import Login from '@/component/auth/login'
import Signup from '@/component/auth/signup'
import Archive from '@/component/display/archive'
import Box from '@/component/display/box'
import Grid from '@/component/display/grid'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

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
        case "photo":
            return (
                <Archive>
                    <Grid view='picture' edit={true} />
                </Archive>
            )
        case "user":
            return (
                <Archive>
                    <Grid view='user' />
                </Archive>)
        case "profile":
            return (
                <Archive>
                    <Grid view='profile' />
                </Archive>)
        case "blog":
            return (
                <Archive>
                    <Grid archive={params.archive} view='item' edit={true} />
                </Archive>
            )
    }

    return (
        <NotFound />
    )
}
export default page