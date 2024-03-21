'use client'
import { AdminAuthen } from '@/action/AdminAuthen'
import NotFound from '@/app/not-found'
import Archive from '@/component/display/archive'
import Detail from '@/component/display/detail'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import DetailCreate from '@/component/display/detailCreate'
type Props = {
    params: {
        archive: string,
        slug: string,
    }
}

const page = ({ params }: Props) => {

    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)

    const update = () => {
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))
    }

    update()
    const [item, setItem] = useState<any>({})

    const getItemBySlug = async (archive: string, slug: string) => {
        const result = await AdminAuthen.getItemBySlug(archive, slug)
        setItem(result.data[0])
    }

    useEffect(() => {
        getItemBySlug(params.archive, params.slug)
    }, [currentRefresh])

    if (params.slug === "new" + params.archive) {
        return (
            <Archive>
                <DetailCreate genre={params.archive} />
            </Archive>
        )
    }
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