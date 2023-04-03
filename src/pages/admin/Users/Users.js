import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Admin/Shared";
import { UserForm, ListUsers } from "../../../components/Admin/Users";
import "./User.scss";

export function Users() {
  const [showModal, setShowModal] = useState(false);

  //funcion useState que funciona para que la info del los clientes registrados
  // se recargue automaticamente
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  //depende del valor ya sea true o false los datos de los usuarios se recargaran 
  // automaticamente
  const onReload = () => setReload((prevState) => !prevState);


  //se debe setear el elemento reload desde el <ListUsers />
  const panes = [
    {
      menuItem: "Usuario Activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers userActive={true} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Usuario Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers userActive={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="users-pages">
        <Button className="users-pages__add" onClick={onOpenCloseModal}>
          Usuario Nuevo
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      {/* interfaz para que habra un formulario y anexe un nuevo usuario  */}
      <BasicModal
        show={showModal}
        // funcion para poder cerrar el formulario
        close={onOpenCloseModal}
        title="Crear Nuevo Usuario"
        // en este  caso cuando el userForm se active si le envio parametros cambiara la vista del boton
      >
        <UserForm close={onOpenCloseModal} onReload={onReload} /*user={{ username: "manuel" }}*/ />
      </BasicModal>
    </>
  );
}
