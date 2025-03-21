import React, { useState } from 'react';

function Items({ userRole }) {
  const [items, setItems] = useState([
    { id: 1, name: 'Item A', quantity: 10, description: 'Example item A' },
    { id: 2, name: 'Item B', quantity: 5, description: 'Example item B' },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');

  // Warehouse manager, lisää uusi tuote
  const handleAddItem = () => {
    if (!newItemName) return;
    const newItem = {
      id: items.length + 1,
      name: newItemName,
      quantity: 0,
      description: newItemDesc,
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemDesc('');
  };

  // Warehouse worker, muuta tuotteen määrää
  const adjustQuantity = (id, delta) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  const changeQuantity = (id) => {
    const newQty = parseInt(prompt('Enter new quantity:'), 10);
    if (!isNaN(newQty)) {
      setItems(
        items.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  return (
    <div className="items">
      <h2>Items</h2>
      {userRole === 'manager' && (
        <div className="add-item">
          <h3>Add New Item</h3>
          <input
            type="text"
            placeholder="Item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Item description"
            value={newItemDesc}
            onChange={(e) => setNewItemDesc(e.target.value)}
          />
          <br />
          <button onClick={handleAddItem}>Add item</button>
        </div>
      )}

      {userRole === 'worker' && (
        <div className="update-quantity">
          <h3>Update Item Quantity</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity}{' '}
                <button onClick={() => adjustQuantity(item.id, 1)}>+</button>
                <button onClick={() => adjustQuantity(item.id, -1)}>-</button>
                <button onClick={() => changeQuantity(item.id)}>Change</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Manager näkee myös listan tuotteista */}
      {userRole === 'manager' && (
        <div className="items-list">
          <h3>Current Items</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Items;
