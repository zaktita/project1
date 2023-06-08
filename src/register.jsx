import React, { useState } from 'react';
import axios from 'axios';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/register', {
        name: name,
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

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

        <input
          type="submit"
          value="Register"
          name="submit"
          className="submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default Register;
