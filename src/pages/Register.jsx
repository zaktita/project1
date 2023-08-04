import React, { useState } from "react";
import axiosClient from "../axios_client";
import { useStateContext } from "../Contexts/ContextProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, message, Input } from "antd";
import img from "../images/bg_img.webp";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({ __html: "" });
  const {setTokenFunction } = useStateContext();
  const navigate = useNavigate();

  function handleSubmit(e) {
    console.log("btn working");
    e.preventDefault();
    setErrors({ __html: "" });

    axiosClient
      .post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.errors) {
          setErrors(response.data.errors);
          message.error(errors);

          return;
        }
        else {
          setTokenFunction(response.data.token, response.data.user);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle different error cases here (if any)
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 422) {
            const errorData = error.response.data;
            if (errorData && errorData.errors) {
              const errors = errorData.errors;
              if (Array.isArray(errors)) {
                errors.forEach((error) => {
                  message.error(error);
                });
                return;
              }
              if (typeof errors === "object") {
                for (const field in errors) {
                  if (Array.isArray(errors[field])) {
                    errors[field].forEach((error) => {
                      message.error(error);
                    });
                  } else {
                    message.error(errors[field]);
                  }
                }
                return;
              }
            }
          }
        }
        // Display common error message if no specific condition is met
        message.error("An error occurred during login. Please try again.");
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
          backgroundColor: "rgba(255, 255, 255,0.3)",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Register</h2>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
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
        <Form.Item
          name="passwordConfirmation"
          rules={[
            {
              required: true,
              message: "Please confirm your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            className="login-form-button w-100"
          >
            Create account
          </Button>
        </Form.Item>
        <span className="text-center text-muted mt-2 mb-2 d-flex justify-content-between">
          Have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Log in
          </Link>
        </span>
      </Form>
    </div>
  );
}

export default Register;
