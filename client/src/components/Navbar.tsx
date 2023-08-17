import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useAuthUser, useSignOut } from 'react-auth-kit';

const Navbar: React.FC = () => {
    const signOut = useSignOut()

    const authUser = useAuthUser();

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
                    {authUser() ? (
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