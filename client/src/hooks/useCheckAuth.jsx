import { useState } from "react"
import axios from 'axios'


const baseURL = 'http://localhost:3000'
const instance = axios.create({
    baseURL: baseURL,
    method: ['GET', 'PUT', 'DELETE', 'POST'],
    withCredentials: true
})


export const useCheckAuth = () => {
    const [auth, setAuth] = useState()

    const check = async () => {
        const response = await instance.get(
            `${baseURL}/checkAuth`
        )   

        if(response.data.success) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }

    check()

    return {auth, setAuth}
}