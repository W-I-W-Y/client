import React, { useState } from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <a className="menuA" href="/">
          Home
        </a>
      </Menu.Item>
      <Menu.Item key="community">
        <a className="menuA" href="/community">
          Community
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
