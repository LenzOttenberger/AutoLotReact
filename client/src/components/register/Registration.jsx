import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import './registration.css'

const baseURL = 'http://localhost:3000'
const instance = axios.create({
    baseURL: baseURL,
    method: ['POST', 'GET', 'DELETE', 'PUT'],
    withCredentials: true
})

export default function Registration() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [mail, setMail] = useState()
    const [phone, setPhone] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    const userRegistration = async () => {
        const response = await instance.post(
            `${baseURL}/registration`,
            {
                username,
                password,
                mail,
                phone
            },
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
        
        if(response.data.success) {
            navigate('/login')
        } else {
            setError(true)
        }
    }

    return(
        <div className="Main">
            <Header/>
            <div className="registration">
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <input type="text" placeholder="Mail" onChange={(e) => {setMail(e.target.value)}}/>
                <input type="text" placeholder="Phone Number" onChange={(e) => {setPhone(e.target.value)}}/>
                <button onClick={() => userRegistration()}>Sign Up</button>
                {error ? <h2>Error! Something wrong!</h2> : null}
            </div>
        </div>
    )
}