import React from 'react';

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
