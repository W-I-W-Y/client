import React, { useState, useEffect } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../Config";
import { useHistory } from "react-router";

import { Form, Input, message, Typography } from "antd";
// const { Option } = Select;
const { Title } = Typography;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function MemberPage() {
  const [userInfo, setUserInfo] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    Axios.get(`${USER_SERVER}/api/member/info`, { headers }).then(
      (response, index) => {
        console.log("회원정보");
        console.log(response.data);
        if (response.data !== null) {
          setUserInfo({
            id: response.data.id,
            username: response.data.username,
            password: response.data.password,
            email: response.data.email,
          });
        } else {
          alert("회원 정보를 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);
  const history = useHistory();

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setNewPassword(e.target.value);
  };

  const handleSubmit = () => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    const variable = {
      username: newUsername,
      password: newPassword,
      email: newEmail,
    };

    Axios.patch(`${USER_SERVER}/api/member/modify`, variable, {
      headers,
    }).then((response) => {
      if (response.data === "modifyMember") {
        message.success("회원정보를 성공적으로 수정하였습니다");

        setTimeout(() => {
          history.push("../../community");
          window.scrollTo(0, 0);
        }, 3000);
      } else {
        alert("정보 수정에 실패했습니다.");
      }
    });
  };

  return (
    <div className="app">
      <Title
        level={2}
        style={{
          fontFamily: "Droid Sans",
          fontSize: "2rem",
          marginBottom: "20px",
        }}
      >
        내 정보 수정
      </Title>
      <Form
        style={{ minWidth: "375px", marginLeft: "-60px" }}
        {...formItemLayout}
        onSubmit={handleSubmit}
      >
        <Form.Item required label="Name">
          <Input
            id="username"
            placeholder={userInfo.username}
            type="text"
            // value={values.username}
            onChange={handleNameChange}
            // onBlur={handleBlur}
            // className={
            //   errors.username && touched.username
            //     ? "text-input error"
            //     : "text-input"
            // }
          />
          {/* {errors.username && touched.username && (
            <div className="input-feedback">{errors.username}</div>
          )} */}
        </Form.Item>

        <Form.Item
          required
          label="Email"
          hasFeedback
          //   validateStatus={errors.email && touched.email ? "error" : "success"}
        >
          <Input
            id="email"
            placeholder={userInfo.email}
            type="email"
            // value={values.email}
            onChange={handleEmailChange}
            // onBlur={handleBlur}
            // className={
            //   errors.email && touched.email ? "text-input error" : "text-input"
            // }
          />
          {/* {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )} */}
        </Form.Item>

        <Form.Item
          required
          label="Password"
          hasFeedback
          //   validateStatus={
          //     errors.password && touched.password ? "error" : "success"
          //   }
        >
          <Input
            id="password"
            placeholder={userInfo.password}
            type="password"
            // value={values.password}
            onChange={handlePasswordChange}
            // onBlur={handleBlur}
            // className={
            //   errors.password && touched.password
            //     ? "text-input error"
            //     : "text-input"
            // }
          />
          {/* {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )} */}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <a
            className="button"
            onClick={handleSubmit}
            type="primary"
            style={{
              fontFamily: "Droid Sans",
              fontSize: "0.7rem",
              margin: "10px",
              minWidth: "50%",
            }}
          >
            Submit
          </a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default MemberPage;
