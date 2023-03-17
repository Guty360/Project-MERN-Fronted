import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { WebRoutes, AdminRoutes } from "./routers"

export default function App() {
  return (
    <BrowserRouter>
        <WebRoutes/>
        <AdminRoutes/>
    </BrowserRouter>
      
  )
}


