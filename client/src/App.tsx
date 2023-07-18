import React, { useEffect, useState } from 'react'
import './App.css'
import {Button} from '@material-ui/core';

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
                      <li key={smiski._id}>{smiski.name} {smiski.series}</li>
                  ))
              }
          </ul>

          <form onSubmit={handleCreateSmiski}>
            <label htmlFor="smiski-title">Smiski Title </label>
              <input id="smiski-title"
                value = {title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    {
                        setTitle(e.target.value);
                    }}
                    />
                     <Button color="primary" variant="contained"> Create Smiski </Button> 
          </form>
      </div>
  )
}

export default App
