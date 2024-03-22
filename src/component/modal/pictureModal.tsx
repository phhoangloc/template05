import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Box from '../display/box'
import CloseIcon from '@mui/icons-material/Close';
import UploadButton from '../input/uploadButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AdminAuthen } from '@/action/AdminAuthen';
type Props = {
    username?: string,
    open?: boolean,
    close?: () => void
    select?: (e: any) => void
    create?: (preview: any, file: File) => void
}

const PictureModal = ({ username, open, close, select, create }: Props) => {
    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            create && create(reader.result, file)
        }
    }

    const [data, setData] = useState<any[]>([])
    const getPicFromUser = async (username: string) => {
        const result = await AdminAuthen.getPicFromUser(username)
        if (result.success) {
            setData(result.data)
        }
    }

    useEffect(() => {
        username && getPicFromUser(username)
    }, [username])
    return (
        <div className='pictureModal' style={{ display: open ? "block" : "none" }}>
            <CloseIcon onClick={() => close && close()} style={{ position: "absolute", right: "5px", top: "5px", zIndex: 2 }} />
            <div className='pictureBox scrollNone grid_box '>
                <Box
                    cn='xs4 sm4 md3 lg2 boxShadow center '
                    bg
                    sx={{ aspectRatio: 1, borderRadius: "5px", cursor: "pointer", textAlign: "center", padding: "5px" }}>
                    <UploadButton icon={<AddPhotoAlternateIcon />} func={(e) => getFile(e)} />
                </Box>
                {
                    data?.map((item: any, index: any) =>
                        <Box
                            cn='xs4 sm4 md3 lg2 boxShadow'
                            bg
                            key={index}
                            sx={{ aspectRatio: 1, borderRadius: "5px", cursor: "pointer" }}
                            onClick={() => select && select(item)}>
                            <div style={{ height: "100%", position: "relative", margin: 0 }}>
                                <Image src={process.env.google_url + item.name} sizes='100%' alt='pic' fill style={{ objectFit: 'cover', borderRadius: "5px" }} priority={true} />
                            </div>

                        </Box>
                    )
                }
            </div>
        </div>
    )
}

export default PictureModal