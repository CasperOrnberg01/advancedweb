import React from 'react';

// Navigaatio palkki, kaksi nappia: items ja orders
//currentScene = mikä näkymä
// onNavigate funktio toiseen näkymään siirtymiseen
function Nav({ currentScene, onNavigate }) {
  return (
    <nav>
      <button onClick={() => onNavigate('items')} disabled={currentScene === 'items'}>
        Items
      </button>
      <button onClick={() => onNavigate('orders')} disabled={currentScene === 'orders'}>
        Orders
      </button>
    </nav>
  );
}

export default Nav;
