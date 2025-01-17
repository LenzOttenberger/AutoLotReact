import { useEffect, useState } from "react"
import CellForChoose from "../cellForChoose/CellForChoose"
import CellForFromTo from "../cellForFromTo/CellForFromTo"
import axios from "axios"
import './filter.css'

const baseURL = 'http://localhost:3000'
const instance = axios.create({
    baseURL: baseURL,
    method: ['POST'],
    withCredentials: true
})

export default function Filter({search, setBrand, setModel, setGeneration, setGear, setBody, setYear, setCost}) {
    const [brandList, setBrandList] = useState(['Brand'])
    const [modelList, setModelList] = useState(['Model'])
    const [generationList, setGenerationList] = useState(['Generation'])
    const [gearList, setGearList] = useState(['Gear'])
    const [bodyList, setBodyList] = useState(['Body'])
    const [clear, setClear] = useState(0)

    useEffect(() => {
        getData(0, 'brand')
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
                case 'brand':
                    setBrandList(get.data.list)
                    break
                case 'model':
                    setModelList(get.data.list)
                    break
                case 'generation':
                    setGenerationList(get.data.list)
                    break
                case 'gear':
                    setGearList(get.data.list)
                    break
                case 'body': 
                    setBodyList(get.data.list)
                    break
            }
        }
    }
    
    return(
        <div className="filter">
            <div className="firstFloor">
                <CellForChoose object="Brand" setObject={(item) => {setBrand(item), getData(item, 'model'), setModel(''), setGeneration(''), setGenerationList(['Generation'])}} list={brandList}/>
                <CellForChoose object="Model" setObject={(item) => {setModel(item), getData(item, 'generation'), setGeneration('')}} list={modelList}/>
                <CellForChoose object="Generation" setObject={(item) => setGeneration(item)} list={generationList}/>
            </div>
            <div className="secondFloor">
                <CellForFromTo clear={clear} object="Year" setObject={(item) => setYear(item)}/>
                <button className="reset" onClick={() => {setClear(1), setBrand(''), setModel(''), setGeneration(''), setGear(''), setBody(''), setYear({from: 0, to: 0}), setCost({from: 0, to: 0}), setBrandList(['Brand']), setModelList(['Model']), setGenerationList(['Generation']), setGearList(['Gear']), setBodyList(['Body']), getData(0, 'brand'), getData(0, 'gear'), getData(0, 'body')}}>Reset</button>
                <CellForFromTo clear={clear} object="Cost" setObject={(item) => setCost(item)}/>
            </div>
            <div className="thirdFloor">
                <CellForChoose object="Gear" setObject={(item) => setGear(item)} list={gearList}/>
                <button className="search" onClick={() => {search()}}>Search</button>
                <CellForChoose object="Body" setObject={(item) => setBody(item)} list={bodyList}/>
            </div>
        </div>
    )
}