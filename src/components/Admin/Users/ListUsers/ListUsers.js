import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { Users } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { size, map } from "lodash";
import { UserItem } from "../UserItem";

const userController = new Users();

export function ListUsers(props) {
  const { userActive, reload, onReload } = props;
  const [user, setUser] = useState(null);

  const { accesToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setUser(null);

        const response = await userController.getUserFunction(
          accesToken,
          userActive
        );

        setUser(response);

      } catch (error) {
        console.error(error);
      }
    })();
  }, [accesToken, userActive, reload]);

  if (!user) return <Loader active inline="centered" />;

  if (!size(user) === 0) return "No Hay Ningún Usuario";
  return map(user, (user) => (
    <UserItem key={user._id} user={user} onReload={onReload}/>
  ));
}
