import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Box from '../display/box'
import CloseIcon from '@mui/icons-material/Close';
import UploadButton from '../input/uploadButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AdminAuthen } from '@/action/AdminAuthen';
import { UserAuthen } from '@/action/UserAuthen';
type Props = {
    data: []
    open?: boolean,
    close?: () => void
    select?: (e: any) => void
    create?: (preview: any, file: File) => void
}

const PictureModal = ({ data, open, close, select, create }: Props) => {
    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            create && create(reader.result, file)
        }
    }


    return (
        <div className='pictureModal' style={{ display: open ? "block" : "none" }}>
            <CloseIcon onClick={() => close && close()} style={{ position: "absolute", right: "5px", top: "5px", zIndex: 2 }} />
            <div className='pictureBox scrollNone grid_box '>
                <Box
                    cn='xs4 sm4 md3 lg2 boxShadow center '
                    bg
                    sx={{ height: "max-content", borderRadius: "5px", cursor: "pointer", textAlign: "center", padding: "5px" }}>
                    <div className='center' style={{ aspectRatio: 1, position: "relative", margin: 0 }}>
                        <UploadButton icon={<AddPhotoAlternateIcon />} func={(e) => getFile(e)} />
                    </div>
                </Box>
                {
                    data?.map((item: any, index: any) =>
                        <Box
                            cn='xs4 sm4 md3 lg2 boxShadow'
                            bg
                            key={index}
                            sx={{ height: "max-content", borderRadius: "5px", cursor: "pointer" }}
                            onClick={() => select && select(item)}>
                            <div style={{ aspectRatio: 1, position: "relative", margin: 0 }}>
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