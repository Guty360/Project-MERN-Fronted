import React from "react";
import { BrowserRouter } from "react-router-dom";
import { WebRoutes, AdminRoutes } from "./routers";
import { AuthProvider } from "./context";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRoutes />
        <AdminRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
