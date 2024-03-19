import React, { useEffect, useState } from 'react'
import "../style/style.css"
import Box from './box'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AdminAuthen } from '@/action/AdminAuthen'

type Props = {
    children?: React.ReactNode,
    archive?: string
    view?: string
}

const Grid = ({ children, archive, view }: Props) => {
    const toPage = useRouter()

    const [data, setData] = useState<any[]>([])
    const getItem = async (a: string) => {
        const result = await AdminAuthen.getItem(a)
        if (result.success) {
            setData(result.data)
        }
    }

    useEffect(() => {
        archive && getItem(archive)
    }, [archive])


    if (view === "list") {
        return (
            <div className='grid_box'>
                {
                    data?.map((item: any, index: number) =>
                        <Box
                            sx={{ margin: "0", padding: "5px", width: "100%" }}
                            bg
                            key={index}
                            onClick={() => toPage.push(item.genre + "/" + item.slug)}>
                            <p style={{ height: "30px", lineHeight: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</p>
                        </Box>)
                }
            </div >
        )

    }
    if (view === "item") {
        return (
            <div className='grid_box'>
                {
                    data?.map((item: any, index: any) =>
                        <Box
                            cn='xs12 sm6 md4 lg3 boxShadow'
                            bg
                            key={index}
                            onClick={() => toPage.push(item.genre + "/" + item.slug)}
                            sx={{ aspectRatio: 1, padding: "10px", borderRadius: "5px" }}  >
                            {item.cover ?
                                <div style={{ height: "80%", position: "relative", margin: 0 }}><Image src={process.env.google_url + item.cover} alt='pic' fill style={{ objectFit: 'cover', borderRadius: "5px" }} /></div> :
                                <div style={{ height: "80%", position: "relative", margin: 0 }}><Image src={process.env.google_url + item.img?.[item.img.length - 1].name} alt='pic' fill style={{ objectFit: 'cover', borderRadius: "5px" }} /></div>}

                            <p style={{ boxSizing: "border-box", width: "100%", height: "20%", padding: "5px 0", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title || item.name}</p>
                        </Box>)
                }
            </div>
        )

    }
    return (
        <div className='grid_box'>
            {children}
        </div>
    )

}

export default Grid