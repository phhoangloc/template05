import React, { useEffect, useState } from 'react'
import NotFound from '@/app/not-found'
import store from '@/redux/store'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadPicturePreview from '../input/uploadPicturePreview'
import Input from '../input/input'
import Grid from './grid'
import Box from './box'
import TextArea from '../input/textarea'
import Button from '../input/button'
import { AlertType, setAlert } from '@/redux/reducer/alertReducer'
import { AdminAuthen } from '@/action/AdminAuthen';
import { useRouter } from 'next/navigation';
import SyncIcon from '@mui/icons-material/Sync';
type Props = {
    genre: string,
}

const DetailCreate = ({ genre }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }

    update()

    const toPage = useRouter()

    const [sync, setSync] = useState<boolean>(false)

    const [slug, setSlug] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [imgFile, setImgFile] = useState<File>()
    const [cover, setCover] = useState<string>("")

    const body = {
        slug, name, title, detail: content, cover
    }
    const createItem = async (body: any) => {
        const result = await AdminAuthen.createItem(genre, body)
        if (result.success) {
            toPage.push("/admin" + genre + "/" + slug)
        } else {
            console.log(result.msg)
        }
    }

    const UploadFile = async (f: File) => {
        setSync(true)
        const result = await AdminAuthen.uploadFile(f)
        setCover(result)
        setSync(false)
    }
    useEffect(() => {
        if (imgFile && currentAlert.value) {
            UploadFile(imgFile)
        } else {
            setImgFile(undefined)
        }
    }, [currentAlert.value])

    switch (genre) {
        case "blog":
            return (
                <div className='detail'>
                    <Grid>
                        <Box cn='box xs12' bg sx={{ margin: "10px auto", padding: "20px 10px", maxWidth: "992px" }}>
                            <Input name="slug" value={slug} onChange={(e) => setSlug(e)} />
                        </Box>
                        <Box cn='box xs12 ' sx={{ margin: "10px auto", overflow: "hidden", maxWidth: "992px" }}>
                            {/* <UploadPicturePreview
                                icon={sync ? <SyncIcon /> : <AddPhotoAlternateIcon />}
                                func={(f) => {
                                    setImgFile(f);
                                    store.dispatch(setAlert({ value: false, open: true, msg: "bạn có muốn thay đổi hình nền này không?" }))
                                }}
                            /> */}
                            hello
                        </Box>
                        <Box cn='box xs12' bg sx={{ margin: "10px auto", padding: "20px 10px", maxWidth: "992px" }}>
                            <Input name="title" onChange={e => setTitle(e)} value={title} />
                            <TextArea onChange={(e) => setContent(e)} value={""} name='content' />
                        </Box>
                    </Grid>
                    <Button onClick={() => createItem(body)} name="Create" />
                </div>
            )
        case "watch":
            return (
                <div className='detail'>
                    <Grid>
                        <Box cn='box xs12' bg sx={{ margin: "10px auto", padding: "20px 10px", maxWidth: "992px" }}>
                            <Input name="slug" value={slug} onChange={(e) => setSlug(e)} />
                        </Box>
                        <Box cn='box xs12 ' sx={{ margin: "10px auto", overflow: "hidden", maxWidth: "992px" }}>
                            <UploadPicturePreview icon={<AddPhotoAlternateIcon />} />
                        </Box>
                        <Box cn='box xs12' bg sx={{ margin: "10px auto", padding: "20px 10px", maxWidth: "992px" }}>
                            <Input name="name" onChange={e => setName(e)} value={name} />
                            <TextArea onChange={(e) => setContent(e)} value={content} name='content' />
                        </Box>
                    </Grid>
                    <Button onClick={() => createItem(body)} name="Create" />

                </div>
            )
    }

    return <NotFound />
}

export default DetailCreate