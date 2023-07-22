import React from 'react';
import { AppBar, Toolbar, Typography, styled, Tooltip } from '@mui/material';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import About from "../pages/About"
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