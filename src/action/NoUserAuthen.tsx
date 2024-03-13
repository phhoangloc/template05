import axios from "axios"
const login = async (body: { username: string, password: string }) => {
    const result = await axios.post(process.env.server_url + "login", body)
    return result.data
}

const getItem = async (genre: string, brand: string, slug: string) => {
    const result = await axios.get(process.env.server_url + genre + "?brand=" + brand + "&slug=" + slug)
    return result.data

}


export const NoUserAuthen = {
    login,
    getItem,
}