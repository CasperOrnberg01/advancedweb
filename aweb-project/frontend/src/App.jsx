// src/App.jsx
import React, { useState } from 'react';
import Login        from './components/Login';
import Nav          from './components/Nav';
import Items        from './components/Items';
import Orders       from './components/Orders';
import RegisterUser from './components/RegisterUser';
import './App.css';

function App() {
  // Tallennetaan full user (id+username ja rooli)
  const [user, setUser] = useState(null);

  // aseta login näkymä
  const [currentScene, setCurrentScene] = useState('login');

  // Valittu tilaus Orders komponentissa
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Kun login onnistuu, userData sisältää id, username + role
  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentScene('items');
  };

  
  //vaihdetaan klikattua näkymää, orders näkymästä poistuminen resettaa tilauksen
  const navigateTo = (scene) => {
    setCurrentScene(scene);
    if (scene !== 'orders') {
      setSelectedOrderId(null);
    }
  };

  return (
    <div className="App">
      {/* Login */}
      {currentScene === 'login' && (
        <Login onLogin={handleLogin} />
      )}

      {/* Navigation */}
      {currentScene !== 'login' && (
        <Nav
          currentScene={currentScene}
          onNavigate={navigateTo}
          userRole={user.role}
        />
      )}

      {/* Items */}
      {currentScene === 'items' && (
        <Items userRole={user.role} />
      )}

      {/* Orders */}
      {currentScene === 'orders' && (
        <Orders
          userRole={user.role}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
        />
      )}

      {/* RegisterUser (vain managerilla) */}
      {currentScene === 'register' && user.role === 'manager' && (
        <RegisterUser />
      )}
    </div>
  );
}

export default App;
