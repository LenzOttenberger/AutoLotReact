import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import './login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";


const baseUrl = 'http://localhost:3000'
const instance = axios.create({
    baseURL: baseUrl,
    method: ['POST'],
    withCredentials: true
})

export default function Login({setAuth}) {
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const userLogin = async () => {

        const response = await instance.post(
            `${baseUrl}/login`,
            {
                login,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    
        if(response.data.success) {
            setAuth(true)
            navigate('/')

        } else {
            console.log('Login error!')
        }
    } 

    return(
        <div className="Main">
            <Header/>
            <div className="login">
                <input type="text" placeholder="Login" onChange={(e) => setLogin(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <button onClick={() => userLogin()}>Login</button>
                <Link to="/registration"><h2>Don't have account? Please, sign up!</h2></Link>
            </div>
        </div>
    )
}