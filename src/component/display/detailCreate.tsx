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
import PictureModal from '../modal/pictureModal';
import { useRouter } from 'next/navigation';
import { UserLoginType } from '@/redux/reducer/UserReduce';
import { UserAuthen } from '@/action/UserAuthen';
type Props = {
    genre: string,
}

const DetailCreate = ({ genre }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const toPage = useRouter()

    const [sync, setSync] = useState<boolean>(false)

    const [slug, setSlug] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [imgPre, setImgPre] = useState<File>()
    const [imgFile, setImgFile] = useState<File>()
    const [cover, setCover] = useState<string>("")

    const body = {
        slug, name, title, detail: content, cover
    }
    const createItem = async (a: string, body: any) => {
        const result = await UserAuthen.createItem(a, body)
        if (result.success) {
            toPage.push("/admin/" + genre + "/" + slug)
        } else {
            console.log(result.msg)
        }
    }

    const getFile = async (e: any) => {
        var files = e.target.files;
        const arrFiles: File[] = Object.values(files)
        arrFiles.map((file: File) => {
            var reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                setImgFile(file)
                setImgPre(reader.result)
            }
        })
    }

    const UploadFile = async (f: File) => {
        setSync(true)
        const result = await UserAuthen.uploadFile(f)
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

    const [openModal, setOpenModal] = useState<boolean>(false)

    switch (genre) {
        case "blog":
            return (
                <div className='detail'>
                    <Grid>
                        <Box cn='box xs12' bg sx={{ margin: "10px auto", padding: "20px 10px", maxWidth: "992px" }}>
                            <Input name="slug" value={slug} onChange={(e) => setSlug(e)} />
                        </Box>
                        <Box cn='box xs12 ' sx={{ margin: "10px auto", overflow: "hidden", maxWidth: "992px" }}>
                            <UploadPicturePreview
                                src={imgPre ? imgPre : undefined}
                                icon={<AddPhotoAlternateIcon />}
                                func={() => { setOpenModal(true) }}
                            />
                            <PictureModal
                                data={currentUser ? currentUser.pic : []}
                                open={openModal}
                                close={() => setOpenModal(false)}
                                select={(item) => { setCover(item._id); setImgPre(item); setOpenModal(false) }}
                                create={(pre, f) => {
                                    setImgPre(pre)
                                    setImgFile(f);
                                    store.dispatch(setAlert({ value: false, open: true, msg: "bạn có muốn upload hình nền này không?" }));
                                    setOpenModal(false);
                                }}
                            />
                        </Box>
                        <Box cn='box xs12' bg sx={{ margin: "10px auto", padding: "20px 10px", maxWidth: "992px" }}>
                            <Input name="title" onChange={e => setName(e)} value={name} />
                            <TextArea onChange={(e) => setContent(e)} value={""} name='content' />
                        </Box>
                    </Grid>
                    <Button onClick={() => createItem(genre, body)} name="Create" />
                </div>
            )
    }

    return <NotFound />
}

export default DetailCreate