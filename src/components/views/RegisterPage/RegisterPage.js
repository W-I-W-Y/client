import React, { useState } from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import { Form, Input, Button, Select, Typography } from "antd";
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

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        region: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        region: Yup.string().required("Region is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            username: values.username,
            region: values.region,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload === "회원가입 완료") {
              props.history.push("/login");
              window.scrollTo(0, 0);
            } else {
              alert(response.payload.err);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;

        return (
          <div className="app">
            <Title level={2} style={{ marginBottom: "20px" }}>
              Sing Up
            </Title>
            <Form
              style={{ minWidth: "375px", marginLeft: "-30px" }}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="Name">
                <Input
                  id="username"
                  placeholder="Enter your name"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.username && touched.username && (
                  <div className="input-feedback">{errors.username}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Email"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
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
                  placeholder="Select your region"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.region}
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
                {errors.region && touched.region && (
                  <div className="input-feedback">{errors.region}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Password"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <a
                  className="button"
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
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
      }}
    </Formik>
  );
}

export default RegisterPage;
