import React from 'react'
import './App.css'
import { Header } from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

function App() {
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
