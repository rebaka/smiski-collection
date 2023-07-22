import React, { useEffect, useState } from 'react'
import './App.css'
import {Button, CardActionArea, CardContent, Typography, styled} from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import { CardActions, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { Header } from './components/Header';
import { CheckBox } from '@mui/icons-material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

import Navbar from "./components/Navbar"

type Smiski = {
    _id: String,
    id: Number,
    name: String,
    series: String,
    desc: String,
}

function App() {

  const [smiskis, setSmiskis] = useState<Smiski[]>([]);
  const [title, setTitle] = useState('');

  // async function handleCreateSmiski(e: React.FormEvent) {
  //   //tells browser to not refresh page
  //   e.preventDefault();

  //   //posts to send data
  //   await fetch('http://localhost:5000/smiski', {
  //     method: 'POST', 
  //     body: JSON.stringify({
  //       title, 
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setTitle("");
  // }

  //To fetch data from API endpoints created
  useEffect(() => {
    async function fetchSmiskis() {
      const response = await fetch("http://localhost:5000/smiski"); //return object with JSON method
      const newSmiskis = await response.json();
      setSmiskis(newSmiskis);
    }
    fetchSmiskis();
  }, []);

  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
