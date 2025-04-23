import React from 'react';

// Navigaatio palkki, kaksi nappia: items ja orders
//currentScene = mikä näkymä
// onNavigate funktio toiseen näkymään siirtymiseen
function Nav({ currentScene, onNavigate, userRole }) {
  return (
    <nav>
      <button
        onClick={() => onNavigate('items')}
        disabled={currentScene === 'items'}
      >
        Items
      </button>
      <button
        onClick={() => onNavigate('orders')}
        disabled={currentScene === 'orders'}
      >
        Orders
      </button>
      {/* register scene jos rooli manager Phase 3 lisäys */}
      {userRole === 'manager' && (
        <button
          onClick={() => onNavigate('register')}
          disabled={currentScene === 'register'}
        >
          Register
        </button>
      )}
    </nav>
  );
}

export default Nav;
