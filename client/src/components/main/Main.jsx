import { useState } from "react";
import Filter from "../filter/Filter";
import Lot from "../lot/Lot";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './main.css'

const baseURL = 'http://localhost:3000'
const instance = axios.create({
    baseURL: baseURL,
    method: ['POST'],
    withCredentials: true
})

export default function Main({auth, setAuth}) {
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [generation, setGeneration] = useState('')
    const [year, setYear] = useState({from: 0, to: 0})
    const [cost, setCost] = useState({from: 0, to: 0})
    const [gear, setGear] = useState('')
    const [body, setBody] = useState('')
    const [resultList, setResultList] = useState([])
    const [search, setSearch] = useState([])
    const navigate = useNavigate()

    const searchLots = async() => {
        const response = await instance.post(`${baseURL}/getLots`,
        {
            brand,
            model,
            generation,
            year,
            cost,
            gear,
            body
        },
        {
            headers: {
               'Content-Type': 'application/json' 
            }
        })

        if(response.data.success) {
            setResultList(response.data.lotList)
        } else {
            setResultList([])
            console.log('Error! Something wrong!')
        }
    }

    return(
        <div className="Main">
            <Header/>
            <Filter search={() => searchLots()} setBrand={(item) => setBrand(item)} setModel={(item) => setModel(item)} setGeneration={(item) => setGeneration(item)} setGear={(item) => setGear(item)} setBody={(item) => setBody(item)} setYear={(item) => setYear(item)} setCost={(item) => setCost(item)}/>
            <div className="instruments">
                <select name="sort" id="sort"></select>
                <button onClick={() => {auth ? navigate('account') : navigate('login')}} className="auth">{auth ? 'account' : 'Login Or Register'}</button>
            </div>
            <div className="lots">
                {resultList.map((item, index) => {
                    return <Lot brand={item.brand} model={item.model} generation={item.generation} year={item.year} cost={item.cost} gear={item.gear} body={item.body} key={index}/>
                })}
            </div>

        </div>
    )
}