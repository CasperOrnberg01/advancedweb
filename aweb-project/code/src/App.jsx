import React, { useState } from 'react';
import Login from './components/Login';
import Nav from './components/Nav';
import Items from './components/Items';
import Orders from './components/Orders';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [currentScene, setCurrentScene] = useState('login'); // 'login', 'items', 'orders'
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
    setCurrentScene('items');
  };

  const navigateTo = (scene) => {
    setCurrentScene(scene);
    if (scene !== 'orders') {
      setSelectedOrderId(null);
    }
  };

  return (
    <div className="App">
      {currentScene === 'login' && <Login onLogin={handleLogin} />}
      {currentScene !== 'login' && (
        <Nav currentScene={currentScene} onNavigate={navigateTo} />
      )}
      {currentScene === 'items' && <Items userRole={userRole} />}
      {currentScene === 'orders' && (
        <Orders
          userRole={userRole}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
        />
      )}
    </div>
  );
}

export default App;
