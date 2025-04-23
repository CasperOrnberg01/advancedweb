import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
  //lomakkeen kenttien tilat
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState('worker');
const API_URL = 'https://casperwms-gbedepega8afhhft.canadacentral-01.azurewebsites.net'
  const handleRegister = async () => {
    try {
      // POST-pyyntö backedin api/users/register
      await axios.post(
        `${API_URL}/api/users/register`,
        { username, password, role }
      );
      alert('User registered');
      //Tyhjennetään lomake onnistumisen jälkeen
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
