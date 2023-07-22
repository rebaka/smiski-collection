import { Link } from 'react-router-dom';
import Navbar from "./Navbar"

import './Header.css'

export function Header() {
    return (
        <div className="header">
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="headerTitle">
                            SMISKI COLLECTION
                        </Link>
                    </li>
                </ul>
            </nav>  
            <Navbar/>
  
        </div>
    )
}