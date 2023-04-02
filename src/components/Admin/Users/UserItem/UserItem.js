import React from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import "./UserItem.scss";

export function UserItem(props) {
  const { user } = props;
  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
          <div>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
