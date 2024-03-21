
import axios from "axios"
const getItem = async (a: string) => {
    const result = await axios.get(process.env.server_url + `admin/${a}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return result.data
}

const getItemById = async (a: string, id: string) => {
    const result = await axios.get(process.env.server_url + `admin/${a}?id=${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return result.data
}
const getItemBySlug = async (a: string, slug: string) => {
    const result = await axios.get(process.env.server_url + `admin/${a}?slug=${slug}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return result.data
}
const createItem = async (a: string, body: {}) => {
    const result = await axios.post(process.env.server_url + `admin/${a}`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return result.data
}
const editItem = async (a: string, id: string, body: {}) => {
    const result = await axios.put(process.env.server_url + `admin/${a}?id=${id}`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return result.data
}

const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    const fileUpload = await axios.post(process.env.server_url + "admin/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.token,
        },
    })
    return fileUpload.data
}
const getPic = async (u: string) => {
    const result = await axios.get(process.env.server_url + "admin/pic?username=" + u,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        }
    )
    return result.data
}
const deletePic = async (name: string, id: string) => {
    const result = await axios.delete(process.env.server_url + `admin/pic?name=${name}&id=${id}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        },
    )
    return result.data
}


export const AdminAuthen = {
    getItem,
    getItemById,
    getItemBySlug,
    createItem,
    editItem,
    uploadFile,
    getPic,
    deletePic,
}