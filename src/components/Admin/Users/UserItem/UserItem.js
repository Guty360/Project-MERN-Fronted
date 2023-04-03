import React, { useState } from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { BasicModal } from "../../Shared";
import { UserForm } from "../UserForm";
import { Users } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./UserItem.scss";

const userController = new Users();

export function UserItem(props) {
  const { user, onReload } = props;
  const { accesToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.firstName} ${user.lastName}`);
    onOpenCloseModal();
  };

  const openDesactivateActiveConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      user.active
        ? `Desactivar Usuario: ${user.firstName} ${user.lastName}`
        : `Activar Usuario: ${user.firstName} ${user.lastName}`
    );
    onOpenCloseConfirm();
  };

  const onActivateDesactivate = async () => {
    try {
      await userController.updateUser(accesToken, user._id, {
        active: !user.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteConfirmo = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar Usuario: ${user.firstName} ${user.lastName}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await userController.deleteUser(accesToken, user._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <Image
            className="user-item__info__image"
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
          <div>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
            <br />
          </div>
        </div>
        <div>
          <Button icon primary onClick={openUpdateUser}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={user.active ? "orange" : "teal"}
            onClick={openDesactivateActiveConfirm}
          >
            <Icon name={user.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={openDeleteConfirmo}>
            <Icon name="trash alternate outline" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
      </BasicModal>
      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
