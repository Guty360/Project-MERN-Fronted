import React, { useEffect, useState } from "react";
import { Menu } from "../../../../api";
import { map, size } from "lodash";
import { Loader } from "semantic-ui-react";
import { MenuItem } from "../MenuItem";

const menuController = new Menu();

export function ListMenu(props) {
  const { active } = props;
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setMenu(null);
        const response = await menuController.getMenu(active);

        setMenu(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [active]);

  if (!menu) return <Loader active inline="centered" />;
  if (size(menu) === 0) return "No Hay Ningún Menu";

  return map(menu, (menu) => <MenuItem key={menu._id} menu={menu} />);
}
