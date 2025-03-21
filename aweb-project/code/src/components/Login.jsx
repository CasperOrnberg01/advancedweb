import React, { useState } from 'react';

function Login({ onLogin }) {
  const [role, setRole] = useState('manager');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="manager"
            checked={role === 'manager'}
            onChange={() => setRole('manager')}
          />
          Warehouse Manager
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="worker"
            checked={role === 'worker'}
            onChange={() => setRole('worker')}
          />
          Warehouse Worker
        </label>
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
