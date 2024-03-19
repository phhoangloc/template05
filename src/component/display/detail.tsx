import React, { useState } from 'react'
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
type Props = {
    genre: string,
    data: any
}

const Detail = ({ genre, data }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [edit, setEdit] = useState<boolean>(false)
    const [name, setName] = useState<string>(data.name)
    const [title, setTitle] = useState<string>(data.title)
    const [content, setContent] = useState<string>(data.content)

    switch (genre) {
        case "blog":
            return (
                <div className='detail'>
                    <div className="detail_header" style={{ margin: "0 10px" }}>
                        <Toogle func={(v) => setEdit(v)} save={() => console.log({ title, content })} />
                    </div>
                    {edit ?
                        <Grid>
                            <Box cn='box xs12 ' sx={{ margin: "10px auto", overflow: "hidden", maxWidth: "992px" }}>
                                <UploadPicturePreview src={process.env.google_url + data?.cover} icon={<AddPhotoAlternateIcon />} />
                            </Box>
                            <Box cn='box xs12' bg sx={{ margin: "10px auto", padding: "20px 10px", maxWidth: "992px" }}>
                                <Input name="title" onChange={e => setTitle(e)} value={title} />
                                <TextArea onChange={(e) => setContent(e)} value={data?.detail} name='content' />
                            </Box>
                        </Grid> :
                        <Grid>
                            <Box cn={`center xs12 md6 lg4 boxShadow ${currentTheme ? "background_light" : "background_dark"}`} sx={{ margin: "auto", borderRadius: "5px" }}>
                                <Image src={process.env.google_url + data?.cover} width={500} height={500} alt='cover' style={{ width: "90%", height: "auto", margin: "5% auto", borderRadius: "5px" }} />
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
        case "watch":
            return (
                <div className='detail'>
                    <div className="detail_header" style={{ margin: "0 10px" }}>
                        <Toogle func={(v) => setEdit(v)} save={() => console.log({ name, content })} />
                    </div>
                    {edit ?
                        <Grid>
                            <Box cn='box xs12 ' sx={{ margin: "10px auto", overflow: "hidden", maxWidth: "992px" }}>
                                <UploadPicturePreview src={process.env.google_url + data?.img[data.img.length - 1].name} icon={<AddPhotoAlternateIcon />} />
                            </Box>
                            <Box cn='box xs12' bg sx={{ margin: "10px auto", padding: "20px 10px", maxWidth: "992px" }}>
                                <Input name="title" onChange={e => setName(e)} value={name} />
                                <TextArea onChange={(e) => setContent(e)} value={data?.detail} name='content' />
                            </Box>
                        </Grid> :
                        <Grid>
                            <Box cn={`center xs12 md6 lg4 boxShadow ${currentTheme ? "background_light" : "background_dark"}`} sx={{ margin: "10px auto" }}>
                                <Image src={process.env.google_url + data?.img[data.img.length - 1].name} width={500} height={500} alt='cover' style={{ width: "100%", height: "auto" }} />
                                <h3 style={{ width: "90%", margin: "auto", textAlign: "center", padding: "20px 0", fontSize: "0.9rem" }}>{data?.name}</h3>
                            </Box>
                            <Box cn={`detailBox scrollNone  xs12 md6 lg8 `} sx={{ margin: "10px", overflowX: "hidden" }}>
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