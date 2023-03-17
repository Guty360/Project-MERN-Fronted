import React from 'react'
import { Home } from "../pages/web";
import { Routes, Route } from "react-router-dom"

export function WebRoutes() {
  return (
   <Routes>
        <Route path='/' element={<Home /> }/>
   </Routes>
  )
}
