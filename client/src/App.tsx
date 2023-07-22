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

    //   <div className="App">

    //     {/* <div className="container">
    //       <div className="smiskiContainer">
    //       {smiskis.map((smiski) => (
    //         <div className='smiskiPart' key={smiski._id}>
    //           <FormGroup>
    //             <FormControlLabel control={<Checkbox />} label="" />
    //           </FormGroup>

    //           <Typography className="SmiskiName" variant="h5" component="div" style={{ marginTop: '-8px' }}>
    //             {smiski.name}
    //           </Typography>

    //           <Typography className="SmiskiSeries" variant="h6" style={{ marginTop: '-8px' }}>
    //             {smiski.series}
    //           </Typography>

    //           <Typography className="SmiskiDescription" variant="body2" paragraph>
    //             {smiski.description}
    //           </Typography>
    //         </div>
    //       )
    //       )}
    //     </div> */}

      
        // <div className="container">
        //   <div className="smiskiContainer">
        //   {smiskis.map((smiski) => (
        //     <Card className="smiskiCard" style={{ borderRadius: 18}} key={smiski._id}>
        //       <CardContent className="customCardContent">
        //         <CardActions>
        //           <FormGroup>
        //             <FormControlLabel control={<Checkbox />} label="" />
        //           </FormGroup>
        //         </CardActions>

        //         <Typography className="SmiskiName" variant="h5" component="div" style={{ marginTop: '-8px' }}>
        //           {smiski.name}
        //         </Typography>

        //         <Typography className="SmiskiSeries" variant="h6" style={{ marginTop: '-8px' }}>
        //           {smiski.series}
        //         </Typography>

        //         <Typography className="SmiskiDescription" variant="body2" paragraph>
        //           {smiski.description}
        //         </Typography>
        //       </CardContent>
        //     </Card>
        //     )
        //   )}
        //   </div>
        // </div> 



    // </div> 

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
