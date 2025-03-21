import React, { useState } from 'react';

function Orders({ userRole, selectedOrderId, setSelectedOrderId }) {
  const [orders, setOrders] = useState([
    {
      id: 1,
      type: 'receive',
      items: [{ id: 1, name: 'Item A', quantity: 0 }],
    },
    {
      id: 2,
      type: 'ship',
      items: [{ id: 2, name: 'Item B', quantity: 0 }],
    },
  ]);
  const [updatedQuantities, setUpdatedQuantities] = useState({});

  const handleSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
    const order = orders.find((o) => o.id === orderId);
    const initQuantities = {};
    order.items.forEach((item) => {
      initQuantities[item.id] = item.quantity;
    });
    setUpdatedQuantities(initQuantities);
  };

  const adjustOrderQuantity = (itemId, delta) => {
    setUpdatedQuantities({
      ...updatedQuantities,
      [itemId]: (updatedQuantities[itemId] || 0) + delta,
    });
  };

  const changeOrderQuantity = (itemId) => {
    const newQty = parseInt(prompt('Enter new quantity:'), 10);
    if (!isNaN(newQty)) {
      setUpdatedQuantities({
        ...updatedQuantities,
        [itemId]: newQty,
      });
    }
  };

  const handleSaveOrder = () => {
    alert('Order changes saved!');
    setSelectedOrderId(null);
  };

  return (
    <div className="orders">
      <h2>Orders</h2>
      <div className="order-tabs">
        <button onClick={() => {}}>Receive Shipment</button>
        <button onClick={() => {}}>Ship Products</button>
      </div>
      <div className="orders-list">
        <h3>Order List</h3>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order #{order.id} - {order.type === 'receive' ? 'Receive' : 'Ship'}{' '}
              <button onClick={() => handleSelectOrder(order.id)}>Select</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedOrderId && (
        <div className="order-details">
          <h3>Order Details</h3>
          <ul>
            {orders
              .find((o) => o.id === selectedOrderId)
              .items.map((item) => (
                <li key={item.id}>
                  {item.name} - Quantity: {updatedQuantities[item.id]}
                  <button onClick={() => adjustOrderQuantity(item.id, 1)}>+</button>
                  <button onClick={() => adjustOrderQuantity(item.id, -1)}>-</button>
                  <button onClick={() => changeOrderQuantity(item.id)}>Change</button>
                </li>
              ))}
          </ul>
          <button onClick={handleSaveOrder}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default Orders;
