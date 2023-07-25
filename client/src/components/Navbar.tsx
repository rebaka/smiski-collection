import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar: React.FC = () => {
    return(
        <nav className="customNavbar">
            <ul>
                <li>
                    <Link to="/home" className="home">Home</Link>
                </li>

                <li>
                    <Link to="/about" className="about">About</Link>
                </li>

                <li>
                    <Link to="/sign-in" className="signin">Sign in</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;