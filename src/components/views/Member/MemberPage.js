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
  const [newRegion, setNewRegion] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newnewPassword, setNewNewPassword] = useState("");

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
            region: response.data.region,
          });
        } else {
          alert("회원 정보를 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);
  const history = useHistory();

  const handleNameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  const handleRegionChange = (e) => {
    setNewRegion(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewNewPassword(e.target.value);
  };

  const handleSubmit = () => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    const variable = {
      username: newUsername,
      password: newPassword,
      email: newEmail,
      region: newRegion,
      newPassword: newnewPassword,
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
          label="Region"
          hasFeedback
          // validateStatus={
          //   errors.region && touched.region ? "error" : "success"
          // }
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <select
            id="region"
            name="region"
            placeholder={userInfo.region}
            onChange={handleRegionChange}
            //   onBlur={handleBlur}
            //   value={values.region}
          >
            <option name="region" value="서울">
              서울
            </option>
            <option name="region" value="부산">
              부산
            </option>
            <option name="region" value="대구">
              대구
            </option>
            <option name="region" value="인천">
              인천
            </option>
            <option name="region" value="광주">
              광주
            </option>
            <option name="region" value="대전">
              대전
            </option>
            <option name="region" value="울산">
              울산
            </option>
            <option name="region" value="세종">
              세종
            </option>
            <option name="region" value="경기">
              경기
            </option>
            <option name="region" value="강원">
              강원
            </option>
            <option name="region" value="충북">
              충북
            </option>
            <option name="region" value="충남">
              충남
            </option>
            <option name="region" value="전북">
              전북
            </option>
            <option name="region" value="전남">
              전남
            </option>
            <option name="region" value="경북">
              경북
            </option>
            <option name="region" value="경남">
              경남
            </option>
            <option name="region" value="제주">
              제주
            </option>
          </select>
          {/* {errors.region && touched.region && (
                  <div className="input-feedback">{errors.region}</div>
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

        <Form.Item
          required
          label="NewPassword"
          hasFeedback
          //   validateStatus={
          //     errors.password && touched.password ? "error" : "success"
          //   }
        >
          <Input
            id="password"
            placeholder=""
            type="password"
            // value={values.password}
            onChange={handleNewPasswordChange}
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
