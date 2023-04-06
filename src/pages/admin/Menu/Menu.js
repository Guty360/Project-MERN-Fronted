import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { ListMenu, MenuForm } from "../../../components/Admin/Menu";
import { BasicModal } from "../../../components/Admin/Shared";
import "./Menu.scss";

export function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Menus Activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={true} reload={reload}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Menus Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={false} reload={reload}/>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="menu-page">
        <Button className="menu-page__add" primary onClick={onOpenCloseModal}>
          Nuevo Menu
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear Nuevo Menu"
      >
        <MenuForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
