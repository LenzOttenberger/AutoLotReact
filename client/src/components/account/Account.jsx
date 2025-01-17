//axios
import axios from "axios";
//hooks
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
//css
import './account.css'
//components
import Header from "../header/Header";
import Lot from "../lot/Lot";
//connecting instance
const baseURL = 'http://localhost:3000'
const instance = axios.create({
    baseURL: baseURL,
    method: ['GET'],
    withCredentials: true
})

export default function Account({setAuth}) {
    const [username, setUsername] = useState()
    const [mail, setMail] = useState()
    const [phone, setPhone] = useState()
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const [userLots, setUserLots] = useState()

    //to get info about account
    useEffect(() => {
        const getUser = async () => {
            const response = await instance.get(`${baseURL}/getUser`)
            
            if(response.data.success) {
                setUsername(response.data.username)
                setMail(response.data.mail)
                setPhone(response.data.phone)
                setUserLots(response.data.userLots)
            }
        }

        getUser()
    }, [])

    //to leave from account
    const leaveAccount =  async () => {
        const response = await instance.get(`${baseURL}/leaveAccount`)

        if(response.data.success) {
            setAuth(false)
            navigate('/')
        } else {
            setError(true)
        }
    }

    return(
        <div className="Main">
            <Header/>
            <div className="user">
                <p>Name: {username}</p>
                <p>Mail: {mail}</p>
                <p>Phone Number: {phone}</p>
                <button onClick={() => leaveAccount()}>Leave</button>
                {error ? <h2>Error! Something wrong!</h2> : null}
                <h1 className="lot-info">Your Lots</h1>
                {userLots ? userLots.rows.map((item, index) => {
                    return <Lot brand={item.brand} model={item.model} generation={item.generation} year={item.year} cost={item.cost} gear={item.gear} body={item.body}/>
                }) : <p>You don't have any lots 0-0</p>}
                <button onClick={() => navigate('/addNewLot')}>Add New Lot</button>
            </div>
        </div>
    )
}