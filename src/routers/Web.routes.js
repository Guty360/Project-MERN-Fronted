import React from 'react'
import { 
  Home, Courses,
  Post, Blog,
  Contact
 } from "../pages/web";
import { Routes, Route } from "react-router-dom";
import { ClientLayout } from "../Layouts"

export function WebRoutes() {

  //funcion que carga dos funciones mas 
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
        <Route path='/courses' element={ loadLayout(ClientLayout, Courses) }/>
        <Route path='/contact' element={ loadLayout(ClientLayout, Contact) }/>
        <Route path='/blog' element={ loadLayout(ClientLayout, Blog) }/>
        <Route path='/post' element={ loadLayout(ClientLayout, Post) }/>
        <Route path='/blog/:path' element={ loadLayout(ClientLayout, Post) }/>
        {/* si en el path se le asigna de esta forma "/blog/:path" esto indica que es una variables
        y que path puede tomar un valor diferente para buscar diferentes post */}
   </Routes>
  )
}
