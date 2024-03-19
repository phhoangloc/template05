'use client'
import { AdminAuthen } from '@/action/AdminAuthen'
import NotFound from '@/app/not-found'
import Archive from '@/component/display/archive'
import Detail from '@/component/display/detail'
import React, { useEffect, useState } from 'react'

type Props = {
    params: {
        archive: string,
        slug: string,
    }
}

const page = ({ params }: Props) => {
    const [item, setItem] = useState<any>({})

    const getBlogBySlug = async (archive: string, slug: string) => {
        const result = await AdminAuthen.getItemBySlug(archive, slug)
        setItem(result.data[0])
    }

    useEffect(() => {
        getBlogBySlug(params.archive, params.slug)
    }, [params.slug])

    // console.log(item._id)
    if (item?._id) {
        return (
            <Archive>
                <Detail genre={params.archive} data={item} />
            </Archive>
        )
    }
    return <Archive>
        <NotFound />
    </Archive>
}

export default page