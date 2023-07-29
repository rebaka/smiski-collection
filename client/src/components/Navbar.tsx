import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import { UserContext, UserContextProvider } from '../context/UserContext';

const Navbar: React.FC = () => {

    const userContext = useContext(UserContext);
    const { user } = userContext || {};

    const signOut = () => {
        userContext?.setUser(null);
    };

    return(
        <nav className="customNavbar">
            <ul>
                <li>
                    <Link to="/home" className="home">Home</Link>
                </li>

                <li>
                    <Link to="/about" className="about">About</Link>
                </li>

                {/* <li>
                    <Link to="/sign-in" className="signin">Sign in</Link>
                </li> */}
                <li>
                {user?.username ? (
                    <Link to="/" className="signout" onClick={signOut}>Sign Out</Link>
                ):(
                    <Link to="/sign-in" className="signin">Sign In</Link>
                )}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;