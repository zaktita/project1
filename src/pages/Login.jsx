import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    
    AuthService.login(email, password)
      .then(() => {
        console.log('success');
      return  <Navigate to='/dashboard'/>
      })
      .catch(error => {
        console.log(error);
        setError('Invalid email or password');
      });
  };
  return (
    <div className='login'>
      <form action="" onSubmit={handleSubmit}>

      <h2>Login to your account</h2>

      <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
      <input type="password" value={password} onChange={event => setPassword(event.target.value)} />      <h6>dont have an account 
        <Link to='/register'>Create an account</Link>
      </h6>
      <input className="submit" type="submit"  onClick={onsubmit} value='submit' />
      {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default Login
