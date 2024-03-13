
import axios from "axios"
const checkLogin = async () => {
    const result = await axios.get(process.env.server_url + "myuser", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}
const update = async (body: {}) => {
    const result = await axios.put(process.env.server_url + "myuser", body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}
const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    const fileUpload = await axios.post(process.env.server_url + "myuser/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.token,
        },
    })
    return fileUpload.data
}

const createCart = async (body: any) => {
    const result = await axios.post(process.env.server_url + "myuser/cart", body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}

export const UserAuthen = {
    checkLogin,
    update,
    uploadFile,
    createCart,
}