import React, { useEffect, useState } from 'react'
import './App.css'
import {Button, CardActionArea, CardContent, Typography} from '@material-ui/core';
import Card from '@mui/material/Card';

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

  async function handleCreateSmiski(e: React.FormEvent) {
    //tells browser to not refresh page
    e.preventDefault();

    //posts to send data
    await fetch('http://localhost:5000/smiski', {
      method: 'POST', 
      body: JSON.stringify({
        title, 
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
  }

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
      <div className="App">          
          <ul className="smiskis">
              {
                  smiskis.map((smiski) => (
                    <Card className='card' key={smiski._id}>

                      <CardContent className='customCardContent'>
                        <Typography className='SmiskiName' gutterBottom variant="h5" component="div">
                          {smiski.name}
                        </Typography>

                        <Typography className='SmiskiSeries' gutterBottom variant="h6">
                          {smiski.series}
                        </Typography>

                        <Typography className='SmiskiDescription' gutterBottom variant="body2" paragraph>
                          {smiski.description}
                        </Typography>
                      </CardContent>
        
                    </Card>
                  ))
              }
          </ul>

          {/* <form onSubmit={handleCreateSmiski}>
            <label htmlFor="smiski-title">Smiski Title </label>
              <input id="smiski-title"
                value = {title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    {
                        setTitle(e.target.value);
                    }}
                    />
                     <Button color="primary" variant="contained"> Create Smiski </Button> 
          </form> */}
      </div>
  )
}

export default App
