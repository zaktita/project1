import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios_client";
import img from "../images/bg_img.webp";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, message, Input } from "antd";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();

  const {setTokenFunction } = useStateContext();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors();

    axiosClient
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.errors) {
          setErrors(response.data.errors);
          return;
        } else {
          setTokenFunction(response.data.token, response.data.user);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle different error cases here (if any)
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 422) {
            message.error("Unauthorized. Invalid email or password.");
          } else {
            message.error("An error occurred during login. Please try again.");
          }
        } else {
          message.error(
            "Network error. Please check your internet connection."
          );
        }
      });
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "Grid",
        placeItems: "center",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        style={{
          padding: "50px 30px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255)",
          boxShadow: '0px 0px 40px 5px rgba(255, 255, 255)',

        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Login</h2>
        <Form.Item
          name="email"
          rules={[
            {
              autocomplete: true,
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon " />}
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              autocomplete: true,
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            className="login-form-button w-100"
          >
            Log in
          </Button>
        </Form.Item>
        Dont have an account?{" "}
        <Link
          to="/register"
          style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          Create an account
        </Link>
      </Form>
    </div>
  );
}

export default Login;
