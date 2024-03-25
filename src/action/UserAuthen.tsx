
import axios from "axios"
const checkLogin = async () => {
    const result = await axios.get(process.env.server_url + "user", {
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
    const fileUpload = await axios.post(process.env.server_url + "user/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.token,
        },
    })
    return fileUpload.data
}
const getItem = async (a: string, skip: number | undefined, limit: number | undefined) => {
    const result = await axios.get(process.env.server_url + `user/${a}?skip=${skip ? skip : ""}&limit=${limit ? limit : ""}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return result.data
}
const getPic = async (u: string) => {
    const result = await axios.get(process.env.server_url + "user/pic?username=" + u,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        }
    )
    return result.data
}
const deleteFile = async (name: string, id: string) => {
    const result = await axios.delete(process.env.server_url + `user/pic?name=${name}&id=${id}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        },
    )
    return result.data
}
const createItem = async (a: string, body: any) => {
    const result = await axios.post(process.env.server_url + "user/" + a, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}
const updateItem = async (a: string, id: string, body: any) => {
    const result = await axios.put(process.env.server_url + "user/" + a + "?id=" + id, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}
export const UserAuthen = {
    checkLogin,
    uploadFile,
    createItem,
    getItem,
    getPic,
    deleteFile,
    updateItem
}