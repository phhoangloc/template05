import React, { useEffect, useState } from 'react'
import "../style/style.css"
import Box from './box'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import store from '@/redux/store'
import { setAlert } from '@/redux/reducer/alertReducer'
import { AlertType } from '@/redux/reducer/alertReducer'
import Pagination from './pagination'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import UploadButton from '../input/uploadButton'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { UserAuthen } from '@/action/UserAuthen'
import { AdminAuthen } from '@/action/AdminAuthen'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import { NoUserAuthen } from '@/action/NoUserAuthen'

type Props = {
    children?: React.ReactNode,
    archive?: string
    view?: string,
    edit?: boolean,
}

const Grid = ({ children, archive, view, edit }: Props) => {
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentAlert(store.getState().alert))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const toPage = useRouter()

    const [data, setData] = useState<any[]>([])
    const [number, setNumber] = useState<number>(0)
    const [sum, setSum] = useState<number>(0)
    const [delImages, setDelImages] = useState<string[]>([])
    const [limit, setLimit] = useState<number>(24)
    const [page, setPage] = useState<number>(0)
    const getUser = async (page: number, limit: number) => {
        const result = await AdminAuthen.getUser(page * limit, limit)
        if (result.success) {
            setData(result.data)
        }
        const resultCount = await AdminAuthen.getUser(undefined, undefined)
        if (resultCount.success) {
            setSum(resultCount.data.length)
        }
    }
    const getItem = async (a: string) => {
        const result = await NoUserAuthen.getItem(a, page * limit, limit)
        if (result.success) {
            setData(result.data)
        }
        const resultCount = await NoUserAuthen.getItem(a, undefined, undefined)
        if (resultCount.success) {
            setSum(resultCount.data.length)
        }
    }

    useEffect(() => {
        archive ? getItem(archive) : null
    }, [number, page])

    // useEffect(() => {
    //     currentUser?.position === "admin" && !archive ? getUser(page, limit) : null
    // }, [number, page])
    const deleleImage = () => {
        store.dispatch(setAlert({ open: true, value: false, msg: "are you sure that you want to delete these image?" }))
    }

    const deletePic = async (item: any) => {
        await UserAuthen.deleteFile(item?.name, item?._id)
        setNumber(pre => pre + 1)
        store.dispatch(setAlert({ open: false, value: false, msg: "" }))
        store.dispatch(setRefresh())
    }
    useEffect(() => {
        if (currentAlert.value && delImages.length) {
            delImages.map(item => deletePic(item))
        }
        store.dispatch(setAlert({ open: false, value: false, msg: "" }))
    }, [currentAlert.value, delImages])

    const getFile = async (e: any) => {
        var files = e.target.files;
        const arrFiles: File[] = Object.values(files)
        arrFiles.map((file: File) => {
            var reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                await UserAuthen.uploadFile(file)
                store.dispatch(setRefresh())
            }
        })
    }

    if (view === "list") {
        return (
            <>
                <div className='grid_box'>
                    {edit ?
                        <Box
                            sx={{ margin: "0", padding: "5px", width: "100%", cursor: "pointer" }}
                            bg
                            onClick={() => toPage.push(archive + "/new" + archive)}
                        >
                            <p style={{ height: "30px", lineHeight: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> + new {archive}</p>
                        </Box> :
                        null}
                    {
                        data?.map((item: any, index: number) =>
                            <Box
                                sx={{ margin: "0", padding: "5px", width: "100%", cursor: "pointer" }}
                                bg
                                key={index}
                                onClick={() => toPage.push(item.genre + "/" + item.slug)}>
                                <p style={{ height: "30px", lineHeight: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title || item.name}</p>
                            </Box>)
                    }
                </div >
                <Pagination page={page} setPagePre={(p) => setPage(p - 1)} setPageNext={(p) => setPage(p + 1)} allItem={sum} limit={limit} />
            </>
        )

    }
    if (view === "item") {
        return (
            <>
                <div className='grid_box'>
                    {edit ? <Box
                        cn='xs12 sm6 md4 lg3 boxShadow '
                        bg
                        onClick={() => toPage.push(archive + "/new" + archive)}
                        sx={{ textAlign: "center", cursor: "pointer", aspectRatio: 1, borderRadius: "5px" }}>
                        <div className='center' style={{ height: "80%", position: "relative", margin: 0 }}>
                            <AddIcon style={{ margin: "auto", width: "50px", height: "50px" }} />
                        </div>

                        <p style={{ boxSizing: "border-box", width: "100%", height: "20%", padding: "5px 0", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>new {archive}</p>
                    </Box> : null}
                    {
                        data?.map((item: any, index: any) =>
                            <Box
                                cn='xs12 sm6 md4 lg3 boxShadow'
                                bg
                                key={index}
                                onClick={() => toPage.push(item.genre + "/" + item.slug)}
                                sx={{ aspectRatio: 1, padding: "10px", borderRadius: "5px", cursor: "pointer" }}  >
                                {item.cover ?
                                    <div style={{ height: "80%", position: "relative", margin: 0 }}>
                                        <Image src={process.env.google_url + item.cover.name} sizes='100%' alt='pic' fill style={{ objectFit: 'cover', borderRadius: "5px" }} priority={true} />
                                    </div> :
                                    <div style={{ height: "80%", position: "relative", margin: 0 }}>
                                        <Image src={process.env.google_url + item.img?.[item.img.length - 1]?.name} sizes='100%' alt='pic' fill style={{ objectFit: 'cover', borderRadius: "5px" }} priority={true} />
                                    </div>}

                                <p style={{ boxSizing: "border-box", width: "100%", height: "20%", padding: "5px 0", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title || item.name}</p>
                            </Box>)
                    }
                </div >
                <Pagination page={page} setPagePre={(p) => setPage(p - 1)} setPageNext={(p) => setPage(p + 1)} allItem={sum} limit={limit} />
            </>
        )

    }
    if (view === "picture") {
        return (
            <>
                <div className='grid_box'>
                    {edit ?

                        <Box bg cn='boxShadow' sx={{ borderRadius: "5px", width: "max-content" }}><DeleteIcon onClick={() => deleleImage()} /></Box>
                        : null}
                </div>
                <div className='grid_box'>
                    {edit ? <Box
                        cn='xs6 sm4 md3 lg2 boxShadow center'
                        bg
                        sx={{ aspectRatio: 1, padding: "10px", borderRadius: "5px", cursor: "pointer" }}
                    >
                        <UploadButton icon={<AddPhotoAlternateIcon />} func={(e) => getFile(e)} />
                    </Box> : null}
                    {
                        currentUser?.pic?.slice(page * limit, page * limit + limit).map((item: any, index: any) =>
                            <Box
                                cn='xs6 sm4 md3 lg2 boxShadow'
                                bg
                                key={index}
                                sx={{ aspectRatio: 1, padding: "10px", borderRadius: "5px", cursor: "pointer" }}  >
                                <div style={{ height: "80%", position: "relative", margin: 0 }}>
                                    <Image src={process.env.google_url + item.name} sizes='100%' alt='pic' fill style={{ objectFit: 'cover', borderRadius: "5px" }} priority={true} />
                                    {edit ? delImages.includes(item) ?
                                        <CheckBoxOutlinedIcon
                                            style={{ position: "absolute", zIndex: 3, color: "#0073e6", right: 0, background: "white" }}
                                            onClick={() => setDelImages(prev => prev.filter(i => i !== item))} /> :
                                        <CheckBoxOutlineBlankIcon
                                            style={{ position: "absolute", zIndex: 3, color: "#0073e6", right: 0, background: "white" }}
                                            onClick={() => setDelImages(prev => [...prev, item])} /> : null
                                    }
                                </div>
                                <p className="center" style={{ textAlign: "center", boxSizing: "border-box", width: "100%", height: "20%", padding: "5px 0", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.host.username}</p>
                            </Box>
                        )
                    }
                </div>
                <Pagination page={page} setPagePre={(p) => setPage(p - 1)} setPageNext={(p) => setPage(p + 1)} allItem={currentUser ? currentUser?.pic?.length : 0} limit={limit} />
            </>
        )

    }
    if (view === "profile") {
        return (
            <div className="profile">
                {currentUser?.username}
            </div>
        )
    }
    if (view === "user") {
        return (
            <>
                <div className='grid_box'>
                    {edit ? <Box
                        sx={{ margin: "0", padding: "5px", width: "100%", cursor: "pointer" }}
                        bg
                        onClick={() => toPage.push("new" + archive)}
                    >
                        <p style={{ height: "30px", lineHeight: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> + new {archive}</p>
                    </Box> : null}
                    {
                        data?.map((item: any, index: number) =>
                            <Box
                                sx={{ margin: "0", padding: "5px", width: "100%", cursor: "pointer" }}
                                bg
                                key={index}
                                onClick={() => toPage.push(item._id)}>
                                <p style={{ height: "30px", lineHeight: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.username}</p>
                            </Box>)
                    }
                </div >
                <Pagination page={page} setPagePre={(p) => setPage(p - 1)} setPageNext={(p) => setPage(p + 1)} allItem={sum} limit={limit} />
            </>
        )
    }
    return (
        <div className='grid_box'>
            {children}
        </div>
    )

}

export default Grid