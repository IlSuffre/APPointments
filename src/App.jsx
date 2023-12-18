import React,{ useState } from 'react'
import './App.css'
import { Home } from './Components/home'
import { Login } from './Components/login'
import { Register } from './Components/register'
import { NavBar } from './Components/nav_bar.jsx';
import { Appuntamento } from './Components/appuntamento'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </Router>
  )
}
export default App
