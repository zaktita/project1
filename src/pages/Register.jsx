import React, { useState } from 'react';
import axiosClient from '../axios_client';
import { useStateContext } from '../Contexts/ContextProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { LockOutlined, UserOutlined ,MailOutlined} from '@ant-design/icons';
import { Button, Checkbox, Form, message, Input } from 'antd';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({__html: ''});
const {setUser,setToken}= useStateContext();

  function handleSubmit(e) {
    console.log('btn working');
    e.preventDefault();
    setErrors({__html: ''})
   
    axiosClient.post('/register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      }
        
      )
      .then(response => {
        console.log(response.data);
      
        if (response.data.errors) {
          setErrors(response.data.errors);
          return;
        }
        setUser(response.data.user);
        setToken(response.data.token);
      })
        .catch(error => {
          if (error.response.data.errors) {
            setErrors(error.response.data.errors);
          }
          console.log(error);
          

        })
  }

  return (


    
    




    <div
  style={{height: '100vh', display:'Grid', placeItems:'center'}}
>

<Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <h2>Create your account</h2>

    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input 
      prefix={<UserOutlined className="site-form-item-icon" />} 
      placeholder='Username'
      type='text'
      onChange={e => setName(e.target.value)}
          value={name}/>
    </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input 
        prefix={<MailOutlined className="site-form-item-icon" />} 
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
      <Form.Item
        name="passwordConfirmation"
        rules={[
          {
            required: true,
            message: 'Please input your PasswordConfirmation!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={event => setPasswordConfirmation(event.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" 
        onClick={handleSubmit} 
        className="login-form-button w-100" >
          Create account
        </Button>
      </Form.Item >
         <span className='text-center text-muted mt-2 mb-2'>
         Have an account? <Link to='/login'>Log in</Link>
         </span>
    </Form>
    </div>

  );
}

export default Register;
