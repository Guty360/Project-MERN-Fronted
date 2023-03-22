import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import "./Auth.scss";
import { Icon } from "../../../assets";
import { RegisterForm } from "../../../components/Admin/Auth"; //gestionar los datos del formulario y muestra en pantalla

export function Auth() {
  const [activeIndex, setactiveIndex] = useState(0);

  const openLogin = () => setactiveIndex(0);

  //construccion de los paneles Login y register
  const panes = [
    {
      menuItem: "Entry to App",
      render: () => (
        <Tab.Pane>
          <h2>Login form</h2>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Register New user",
      render: () => (
        <Tab.Pane>
          {/* vel openLogin verifica el estado del panel activo */}
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div className="auth">
      <Icon.LogoWhile className="logo" />
      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        onTabChange={(_, data) => setactiveIndex(data.activeIndex)}
      />
    </div>
  );
}
