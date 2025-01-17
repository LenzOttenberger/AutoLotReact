import { useEffect, useState } from "react";
import Header from "../header/Header";
import CellForChoose from "../cellForChoose/CellForChoose";
import './addLot.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";


const baseURL = 'http://localhost:3000'
const instance = axios.create({
    baseURL: baseURL,
    method: ['POST', 'GET', 'DELETE', 'PUT'],
    withCredentials: true
})

export default function AddLot() {
    const [brand, setBrand] = useState()
    const [model, setModel] = useState()
    const [generation, setGeneration] = useState()
    const [cost, setCost] = useState()
    const [year, setYear] = useState()
    const [body, setBody] = useState()
    const [gear, setGear] = useState()
    const [error, setError] = useState()
    const [gearList, setGearList] = useState(['Gear'])
    const [bodyList, setBodyList] = useState(['Body'])

    const navigate = useNavigate()

    useEffect(() => {
        getData(0, 'gear')
        getData(0, 'body')
    }, [])

    const getData = async(data, type) => {
        const get = await instance.post(`${baseURL}/getData`,
            {
                data,
                type
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if(get.data.success) {
            switch(get.data.data){
                case 'gear':
                    setGearList(get.data.list)
                    break
                case 'body': 
                    setBodyList(get.data.list)
                    break
            }
        }
    }

    const addLot = async() => {
        const response = await instance.post(`${baseURL}/addNewLot`, 
            {
                brand, 
                model,
                generation,
                cost,
                year,
                body,
                gear
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if(response.data.success) {
            navigate('/account')
        }
    }

    return(
        <div className="Main">
            <Header/>
            <div className="add">
                <input type="text" placeholder="Brand" onChange={(e) => setBrand(e.target.value)}/>
                <input type="text" placeholder="Model" onChange={(e) => setModel(e.target.value)}/>
                <input type="text" placeholder="Generation" onChange={(e) => setGeneration(e.target.value)}/>
                <input type="text" placeholder="Year" onChange={(e) => setYear(e.target.value)}/>
                <CellForChoose object="Gear" setObject={(item) => setGear(item)} list={gearList}/>
                <CellForChoose object="Body" setObject={(item) => setBody(item)} list={bodyList}/>
                <input type="text" placeholder="Cost" onChange={(e) => setCost(e.target.value)}/>
                <button onClick={() => addLot()}>Add Lot</button>
                {error ? <h2>Error! Something wrong!</h2> : null}
            </div>
        </div>
    )
}