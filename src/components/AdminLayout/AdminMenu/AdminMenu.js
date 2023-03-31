import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks";
import "./AdminMenu.scss";

export function AdminMenu() {
  const { pathname } = useLocation();
const {
  user: {role},
} = useAuth();

  const isAdmin = role === "admin";

  const isCurrenPath = (path) => {
    if (path === pathname) {
      return true;
    } else {
      return false;
    }
  };

  return (
    //estos elementos de menu son formato para la estructura de menu
    //esto facilita como quieres los elementos
    <Menu fluid vertical icon text className="admin-menu">
      {isAdmin && (
        <>
          <Menu.Item
            as={Link}
            to="/admin/users"
            active={isCurrenPath("/admin/users")}
          >
            <Icon name="user outline" />
            Usuario
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/menu"
            active={isCurrenPath("/admin/menu")}
          >
            <Icon name="bars" />
            Menu
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/courses"
            active={isCurrenPath("/admin/courses")}
          >
            <Icon name="graduation" />
            Cursos
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/newletter"
            active={isCurrenPath("/admin/newletter")}
          >
            <Icon name="mail outline" />
            NewSletter
          </Menu.Item>
        </>
      )}
      <Menu.Item
        as={Link}
        to="/admin/blog"
        active={isCurrenPath("/admin/blog")}
      >
        <Icon name="comments outline" />
        Blog
      </Menu.Item>
    </Menu>
  );
}
