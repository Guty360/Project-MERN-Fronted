import React from 'react'
import { Routes, Route } from "react-router-dom";
import { 
  Auth, Users,
  Blog, Courses,
  Menu, NewLetter
} from "../pages/admin";
import { AdminLayout  } from "../Layouts";
// import { map } from 'lodash';
import { useAuth } from "../hooks"

// const user = null ;

export function AdminRoutes() {
  const { user } = useAuth();
  //layout is a father and page is a son
  const loadLayout  = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    )
  };

  return (
    <Routes>
        {/* validar un elemento user para verificar el acceso del usuario */}
        {!user ? (
        <Route path="/admin/*" element={ <Auth /> }/>
        ) : (
          <>
          {/* cargar la misma ruta desde dos paths, con la funcion map de lodash*/}
          { ["/admin", "/admin/blog"].map((path) => (
              <Route key={path} path={path} element={loadLayout(AdminLayout, Blog)}/>
          ))}

          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)}/>
          <Route path='/admin/courses' element={loadLayout(AdminLayout, Courses)}/>
          <Route path='/admin/menu' element={loadLayout(AdminLayout, Menu)}/>
          <Route path='/admin/newletter' element={loadLayout(AdminLayout, NewLetter)}/>
          </>
        )};
        
        

    </Routes>
  )
}
