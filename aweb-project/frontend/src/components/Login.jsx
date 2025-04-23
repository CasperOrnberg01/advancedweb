import React, { useState } from 'react';
import axios from 'axios';

// Roolin valinta, käyttäjä valitsee manager/worker
function Login({ onLogin }) {
  //oletus rooli manager
  const [role, setRole] = useState('manager');
  

  //username kenttä (phase3)
  const [username, setUsername] = useState('');
  //password kenttä (phase3)
  const [password, setPassword] = useState('');
  // Kutsutaan onLogin(role), kun lomake lähetetään
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { username, password, role }
      );
      onLogin(res.data); // res.data sisältää id, username, role
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
