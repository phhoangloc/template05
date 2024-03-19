import React, { useRef, useState } from 'react'
import '../style/style.css'
import Image from 'next/image';
import { AddPhotoAlternate } from '@mui/icons-material';
type Props = {
    icon: React.ReactNode | string;
    src?: any,
    size?: number,
    func?: (e: File) => void
}

const UploadPicturePreview = ({ size, src, icon, func }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)

    const [pre, setPre] = useState<any>()

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setPre(reader.result)
            func && func(file)
        }
    }

    return (
        <div className="picturePreview">
            {pre ?
                <Image src={pre} alt='pic' fill style={{ objectFit: 'cover', opacity: "0.9" }} /> :
                src ?
                    <Image src={src} alt='pic' fill style={{ objectFit: 'cover', opacity: "0.9" }} /> :
                    <div className='imageface center'><AddPhotoAlternate /></div>}
            <div className={`upload_button`} style={{ width: size + "px", height: size + "px" }}>
                <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => getFile(e)} multiple={true} />
                <div onClick={() => IconRef.current && IconRef.current.click()}>{icon}</div>
            </div>
        </div>
    )
}

export default UploadPicturePreview