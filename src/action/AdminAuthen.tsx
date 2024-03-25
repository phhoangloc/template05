import axios from "axios"

const getPic = async () => {
    const result = await axios.get(process.env.server_url + "admin/pic",
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        }
    )
    return result.data
}
const getUser = async (skip: number | undefined, limit: number | undefined) => {
    const result = await axios.get(process.env.server_url + `admin/user?skip=${skip ? skip : ""}&limit=${limit ? limit : ""}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        }
    )
    return result.data
}
export const AdminAuthen = {
    getPic,
    getUser
}