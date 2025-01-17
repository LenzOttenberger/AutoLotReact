import { useEffect, useState } from "react";
import './cellForFromTo.css'

export default function CellForFromTo({setObject, object, clear}) {
    const [{from, to}, setFromTo] = useState({from: 0, to: 0})

    return(
        <div className="cellFromTo">
            <input id="in" className="left" type="text" placeholder={object + ' from'} onChange={(e) => {
                setFromTo({from: e.target.value, to})
                setObject({from: e.target.value, to})
            }}/>
            <input id="in" className="right" type="text" placeholder={object + ' to'} onChange={(e) => {
                setFromTo({from, to: e.target.value})
                setObject({from, to: e.target.value})
            }}/>
        </div>
    )
}