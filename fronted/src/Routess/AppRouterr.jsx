import React from 'react'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import Login from '../Screens/Login'
import Register from '../Screens/Register'
import Home from '../Screens/Home'
import Project from '../Screens/Project'

const AppRouterr = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/project" element={<Project/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouterr
