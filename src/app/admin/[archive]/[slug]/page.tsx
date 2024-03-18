import NotFound from '@/app/not-found'
import Archive from '@/component/display/archive'
import React from 'react'

type Props = {
    params: {
        archive: string,
        slug: string,
    }
}

const page = ({ params }: Props) => {
    const blog =
    {
        pic: "/img/blog.jpeg",
        name: "hello! how are you?",
        archive: "blog",
        slug: "hello"
    }
    if (params.archive === blog.archive && params.slug === blog.slug) {
        return (
            <Archive>
                <h1>{blog.archive}</h1>
                <h1>{blog.slug}</h1>
            </Archive>
        )
    }
    return <Archive><NotFound /></Archive>
}

export default page