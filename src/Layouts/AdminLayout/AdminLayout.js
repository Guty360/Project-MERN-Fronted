import React from "react";
import "./AdminLayout.scss";
import { Icon } from "../../assets";
import { AdminMenu } from "../../components/AdminLayout";

export function AdminLayout(props) {
  const { children } = props;

  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <Icon.Logo className="logo" />
        <span>MENU</span>
        <AdminMenu />
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <span>LOGOUT</span>
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
