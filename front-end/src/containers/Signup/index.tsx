import React from "react";
import { SLogo, SSignup } from "./styles";
import { Button, Divider, Form, Input, message } from "antd";
import Title from "antd/lib/typography/Title";
import { Link } from "react-router-dom";
import { AiTwotoneBank } from "react-icons/ai";
import API_URL from "src/api/url";
import { request } from "src/api/axios";
import { Alert } from "src/common/components/Alert";
import RoleProvider from "src/common/context/RoleContext";

export default function Signup() {
  const onFinish = (values: any) => {
    const roles = "CUSTOMER";

    request({
      method: "POST",
      url: API_URL.AUTH.REGISTER,
      data: {
        ...values,
        roles
      },
    }).then((res) => {
      if (res?.data) {
        Alert({
          name: `${res?.data?.message}`,
          icon: "success",
        });
      }
    }).catch((err) => {
      console.log("err: ", err);
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <SSignup>
      <div className="wrapper">
        <SLogo>
          <AiTwotoneBank size={25} color="white" />
        </SLogo>
        <Title level={4}>Register</Title>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginBottom: "15px" }}
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            label="Password"
            name="password1"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 chars" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="password2"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 chars" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password1") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item style={{ marginBottom: "10px" }}>
            <Button block type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>

          <Divider plain>
            or <Link to="/login">
              <span style={{ fontWeight: 600 }}>Login</span>
            </Link>
          </Divider>
        </Form>
      </div>
    </SSignup>
  );
}
