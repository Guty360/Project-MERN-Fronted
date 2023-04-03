import React from "react";
import { Tab, Button } from "semantic-ui-react";
import { ListMenu } from "../../../components/Admin/Menu";
import "./Menu.scss";

export function Menu() {
  const panes = [
    {
      menuItem: "Menu Activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={true}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Menu Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={false}/>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="menu-page">
        <Button className="menu-page__add">Nuevo Menu</Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
    </>
  );
}
