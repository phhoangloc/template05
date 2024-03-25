import React, { useState, useEffect } from 'react'
import Toogle from '../input/toogle'
import NotFound from '@/app/not-found'
import store from '@/redux/store'
import Image from 'next/image'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadPicturePreview from '../input/uploadPicturePreview'
import Input from '../input/input'
import Grid from './grid'
import Box from './box'
import TextArea from '../input/textarea'
import { AdminAuthen } from '@/action/AdminAuthen'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import { AlertType } from '@/redux/reducer/alertReducer'
import { setAlert } from '@/redux/reducer/alertReducer'
import PictureModal from '../modal/pictureModal'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import { UserAuthen } from '@/action/UserAuthen'

type Props = {
    genre: string,
    data: any
}

const Detail = ({ genre, data }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const [loading, setLoading] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [name, setName] = useState<string>(data.name)
    const [title, setTitle] = useState<string>()
    const [content, setContent] = useState<string>(data.content)
    const [imgFile, setImgFile] = useState<File>()
    const [imgPreview, setImgPreview] = useState<any>()
    const [imgPreviewImg, setImgPreviewImg] = useState<any>()
    const [cover, setCover] = useState<any>(data.cover)

    const body = {
        name, title, detail: content, cover
    }
    const updateItem = async (a: string, id: string, body: any) => {
        const result = await UserAuthen.updateItem(a, id, body)
        if (result.success) {
            store.dispatch(setRefresh())
        }
    }
    const UploadFile = async (f: File) => {
        setLoading(true)
        const result = await AdminAuthen.uploadFile(f)
        setCover(result)
        setLoading(false)
    }
    useEffect(() => {
        if (imgFile && currentAlert.value) {
            UploadFile(imgFile)
        } else {
            setImgFile(undefined)
        }
    }, [currentAlert.value])

    const [openModal, setOpenModal] = useState<boolean>(false)


    switch (genre) {
        case "blog":
            return (
                <div className='detail'>
                    <div className="detail_header" style={{ margin: "0 10px" }}>
                        <Toogle func={(v) => setEdit(v)} save={() => updateItem(genre, data._id, body)} />
                    </div>
                    {edit ?
                        <Grid>
                            <Box cn='box xs12 ' sx={{ margin: "10px auto", overflow: "hidden", maxWidth: "992px", position: "relative" }}>
                                <UploadPicturePreview
                                    src={imgPreviewImg && imgPreviewImg || imgPreview?.name && process.env.google_url + imgPreview?.name || process.env.google_url + data?.cover?.name}
                                    icon={<AddPhotoAlternateIcon />}
                                    func={() => { setOpenModal(true) }}
                                    loading={loading} />
                                <PictureModal
                                    data={currentUser?.pic ? currentUser?.pic : []}
                                    open={openModal}
                                    close={() => setOpenModal(false)}
                                    select={(item) => { setCover(item._id); setImgPreview(item); setOpenModal(false) }}
                                    create={(pre, f) => {
                                        setImgPreviewImg(pre)
                                        setImgFile(f);
                                        store.dispatch(setAlert({ value: false, open: true, msg: "bạn có muốn thay đổi hình nền này không?" }));
                                        setOpenModal(false);
                                    }}
                                />
                            </Box>
                            <Box cn='box xs12' bg sx={{ margin: "10px auto", padding: "20px 10px", maxWidth: "992px" }}>
                                <Input name="title" onChange={e => setName(e)} value={name} />
                                <TextArea onChange={(e) => setContent(e)} value={data?.detail} name='content' />
                            </Box>
                        </Grid> :
                        <Grid>
                            <Box cn={`center xs12 md6 lg4 boxShadow`} bg sx={{ margin: "auto", borderRadius: "5px" }}>
                                <Image src={process.env.google_url + data?.cover?.name} width={500} height={500} alt='cover' style={{ width: "90%", height: "auto", margin: "5% auto 0", borderRadius: "5px" }} />
                                <h3 style={{ width: "90%", margin: "auto", textAlign: "center", padding: "20px 0", fontSize: "0.9rem" }}>{data?.title}</h3>
                            </Box>
                            <Box cn={`detailBox scrollNone xs12 md6 lg8 `} sx={{ margin: "10px", overflowX: "hidden" }}>
                                <div className='innerDetail' style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{
                                    __html: data?.detail
                                }}
                                />
                            </Box>
                        </Grid>
                    }
                </div>
            )
    }
    return <NotFound />
}

export default Detail