import './lot.css'

export default function Lot({brand, model, generation, year, cost, gear, body}) {
    return(
        <div className="lot">
            <a href="">
                <div className="info">
                    <h1 className='head'>{brand + ' ' + model + ' ' + generation}</h1>
                    <h2>{year}</h2>
                    <h2>{body + ', ' + gear}</h2>
                    <h1 className='head'>{cost}</h1>
                </div>
            </a>
        </div>
    )
}