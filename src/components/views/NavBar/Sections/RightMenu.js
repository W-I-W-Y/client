/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
    // axios.get(`${USER_SERVER}/logout`).then((response) => {
    //   if (response.status === 200) {
    //     props.history.push("/login");
    //   } else {
    //     alert("Log Out Failed");
    //   }
    // });
  };

  if (localStorage.getItem("token")) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/join">Signup</a>
        </Menu.Item>
      </Menu>
    );
  }
  // return (
  //   <Menu mode={props.mode}>
  //     <Menu.Item key="upload">
  //       <a href="/community/upload">글쓰기</a>
  //     </Menu.Item>
  //     <Menu.Item key="logout">
  //       <a onClick={logoutHandler}>Logout</a>
  //     </Menu.Item>
  //   </Menu>
  // );
}

export default withRouter(RightMenu);
