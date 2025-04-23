import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState('worker');

  const handleRegister = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        { username, password, role }
      );
      alert('User registered');
      setUsername('');
      setPassword('');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="register-user">
      <h2>Register New User</h2>
      <input
        type="text"
        required
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <label>
          <input
            type="radio"
            value="manager"
            checked={role==='manager'}
            onChange={()=>setRole('manager')}
          /> Manager
        </label>
        <label>
          <input
            type="radio"
            value="worker"
            checked={role==='worker'}
            onChange={()=>setRole('worker')}
          /> Worker
        </label>
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterUser;
