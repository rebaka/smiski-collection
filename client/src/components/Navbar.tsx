import React from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import './Navbar.css'
import { useAuthUser, useSignOut } from 'react-auth-kit';

const Navbar: React.FC = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const authUser = useAuthUser();

    const handleSignOut = () => {
        signOut();
        navigate('/');
    }

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
                    {authUser() ? (
                        <Link to="/" className="signout" onClick={handleSignOut}>Sign Out</Link>
                    ):(
                        <Link to="/sign-in" className="signin">Sign In</Link>
                    )}      
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;