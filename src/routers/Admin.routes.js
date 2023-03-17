import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Auth } from "../pages/admin";
import { AdminLayout  } from "../Layouts"


export function AdminRoutes() {

  const loadLayout  = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    )
  };

  return (
    <Routes>
        <Route path='/admin/*' element={loadLayout(AdminLayout, Auth)}/>

    </Routes>
  )
}
