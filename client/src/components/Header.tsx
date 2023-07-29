import React, {createContext, useContext, useState} from 'react'
import { UserContextProvider, UserContext, AuthUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar"

import './Header.css'
import { Typography } from '@mui/material';

export function Header() {

    const userContext  = useContext(UserContext);
    const username = userContext?.user?.username || 'Guest';

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
                        <Typography>Hello, {username}!</Typography>
                    </li>
                </ul>
            </nav>  
            <Navbar/>
  
        </div>
    )
}