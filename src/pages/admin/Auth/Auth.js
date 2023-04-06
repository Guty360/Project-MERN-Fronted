import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import "./Auth.scss";
import { Icon } from "../../../assets";
import { RegisterForm, Login } from "../../../components/Admin/Auth"; //gestionar los datos del formulario y muestra en pantalla

export function Auth() {
  const [activeIndex, setactiveIndex] = useState(0);

  const openLogin = () => setactiveIndex(0);

  //construccion de los paneles Login y register
  const panes = [
    {
      menuItem: "Entry to App",
      render: () => (
        <Tab.Pane>
          <Login openLogin={openLogin} />
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
    // <></>
    <div className="auth">
      <Icon.LogoWhile className="logo" />
      <Tab
        panes={panes} //reenderizando los tab de panes
        className="auth__forms"
        activeIndex={activeIndex} //saber el valor del panel activo 
        onTabChange={(_,data) => setactiveIndex(data.activeIndex)} //reconocer que panel de clickea
      />
    </div>  
  );
}
