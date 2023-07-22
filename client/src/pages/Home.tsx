import React, { useEffect, useState } from 'react'
import './Home.css'
import {CardContent, Typography, styled} from '@material-ui/core';
import Card from '@mui/material/Card';
import { CardActions, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { CheckBox } from '@mui/icons-material';

import { Header } from '../components/Header';

type Smiski = {
    _id: String,
    id: Number,
    name: String,
    series: String,
    desc: String,
}

export default function Home() {

  const [smiskis, setSmiskis] = useState<Smiski[]>([]);
  const [title, setTitle] = useState('');

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
      <div className="Home">
        {/* <Header/>       */}
        <div className="container">
          <div className="smiskiContainer">
          {smiskis.map((smiski) => (
            <Card className="smiskiCard" style={{ borderRadius: 18}} key={smiski._id}>
              <CardContent className="customCardContent">
                <CardActions>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="" />
                  </FormGroup>
                </CardActions>

                <Typography className="SmiskiName" variant="h5" component="div" style={{ marginTop: '-8px' }}>
                  {smiski.name}
                </Typography>

                <Typography className="SmiskiSeries" variant="h6" style={{ marginTop: '-8px' }}>
                  {smiski.series}
                </Typography>

                <Typography className="SmiskiDescription" variant="body2" paragraph>
                  {smiski.description}
                </Typography>
              </CardContent>
            </Card>
            )
          )}
        </div>
      </div>
    </div> 
  )
}