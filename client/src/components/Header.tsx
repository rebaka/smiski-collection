import { useAuthUser } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar"

import './Header.css'
import { Typography } from '@mui/material';

export function Header() {

    const authUser = useAuthUser();
    const username = authUser()?.username;

    return (
        <div className="header">
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="headerTitle">
                            SMISKI COLLECTION
                        </Link>
                    </li>
                    <li>
                        <Typography>Hello, {username ? username : 'Guest'}!</Typography>
                    </li>
                </ul>
            </nav>  
            <Navbar/>
  
        </div>
    )
}