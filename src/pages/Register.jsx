
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();}
  return (
    <div className="register">
      <form>
        <input
          type="text"
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder="Enter your first name"
        />
        <input
          type="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email"
        />
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
        />
        <h6>
          have an account       
        <Link to='/login'>Login</Link>
        </h6>

        <input
          type="submit"
          value="Register"
          name="submit"
          className="submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  )
}

export default Register
