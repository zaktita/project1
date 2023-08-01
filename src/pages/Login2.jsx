import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useStateContext } from '../Contexts/ContextProvider';
import axiosClient from '../axios_client';


import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, message, Input } from 'antd';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState();

  const {setUser,setToken}= useStateContext();
  const navigate = useNavigate();

  function handleSubmit(e) {

    e.preventDefault();
    setErrors();
  
    axiosClient
      .post('/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.errors) {
          setErrors(response.data.errors);
          return;
        } else {
          setUser(response.data.user);
          setToken(response.data.token);
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle different error cases here (if any)
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 422) {
            message.error('Unauthorized. Invalid email or password.');
          } else {
            message.error('An error occurred during login. Please try again.');
          }
        } else {
          message.error('Network error. Please check your internet connection.');
        }
      });
  }

//  const onFinish = (values) => {
//     console.log('Received values of form: ', values);
//   };
  return (

<div
  style={{height: '100vh', display:'Grid', placeItems:'center'}}
>
{/* {errors && message.error(errors)} */}
{errors && <div>{errors}</div>}

<Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h2>Login to your account</h2>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
        value={email}
        placeholder="Email" onChange={event => setEmail(event.target.value)}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" 
        onClick={handleSubmit} 
        className="login-form-button w-100" >
          Log in
        </Button>
      </Form.Item>
        Dont have an account? <Link to='/register'>Create an account</Link>
    </Form>
    </div>

  );
}

export default Login;