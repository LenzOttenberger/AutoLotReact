import './cellForChoose.css'

export default function CellForChoose({list, setObject, object}) {

    return(
        <div className="cell">
            <select onChange={(e) => setObject(e.target.value)} name={object} id={object}>
                {list.map((item, index) => {
                    return <option value={item} key={index}>{item}</option>
                })}
            </select>
        </div>
    )
}