import React, { useState, useEffect } from "react";
import { Menu } from "../../../../api";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";

const menuController = new Menu();

export function ListMenu(props) {
  const { active } = props;
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await menuController.getMenu(active);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [active]);

  if (!menus) return <Loader active inline="centered" />;
  if (size(menus) === 0) return "No Hay Ningún Menu"
   return <div>ListMenu</div>;
}
