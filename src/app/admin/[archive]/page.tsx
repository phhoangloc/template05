'use client'
import NotFound from '@/app/not-found'
import Login from '@/component/auth/login'
import Signup from '@/component/auth/signup'
import Archive from '@/component/display/archive'
import Box from '@/component/display/box'
import Grid from '@/component/display/grid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {

    const blogs = [
        {
            pic: "/img/blog.jpeg",
            name: "hello! how are you?",
            slug: "hello"
        },
        {
            pic: "/img/blog.jpeg",
            name: "hello! how are you?",
            slug: "hello"
        },
        {
            pic: "/img/blog.jpeg",
            name: "hello! how are you?",
            slug: "hello"
        },
        {
            pic: "/img/blog.jpeg",
            name: "hello! how are you?",
            slug: "hello"
        },
        {
            pic: "/img/blog.jpeg",
            name: "hello! how are you?",
            slug: "hello"
        },
        {
            pic: "/img/blog.jpeg",
            name: "hello! how are you?",
            slug: "hello"
        },
        {
            pic: "/img/blog.jpeg",
            name: "hello! how are you?",
            slug: "hello"
        },
        {
            pic: "/img/blog.jpeg",
            name: "hello! how are you?",
            slug: "hello"
        },
    ]

    const toPage = useRouter()
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
            return <Archive>
                <Grid>
                    {
                        blogs?.map((item, index) =>
                            <Box aspectRatio={1} cn=' xs12 sm6 md4 lg3' key={index} onClick={() => toPage.push("blog/" + item.slug)} >
                                <Image src={item.pic} alt='pic' width={100} height={100} style={{ width: "100%", height: "auto" }} />
                                <p>{item.name}</p>
                            </Box>)
                    }
                </Grid>
            </Archive>

    }

    return (
        <NotFound />
    )
}

export default page