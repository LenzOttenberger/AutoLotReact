import './header.css'
import {Link} from 'react-router-dom'

export default function Header() {

    return(
        <div className="header">
            <Link to="/">
                <h1>AutoLot</h1>
            </Link>
        </div>
    )
}