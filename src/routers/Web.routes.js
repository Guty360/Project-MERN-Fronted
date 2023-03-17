import React from 'react'
import { Home } from "../pages/web";
import { Routes, Route } from "react-router-dom";
import { ClientLayout } from "../Layouts"

export function WebRoutes() {

  const  loadLayout = (LoadLayout, Pages) => {
  return( 
    <LoadLayout>
        <Pages />
    </LoadLayout>
  )
  
  };

  return (
   <Routes>
        <Route path='/' element={ loadLayout(ClientLayout, Home) }/>
   </Routes>
  )
}
