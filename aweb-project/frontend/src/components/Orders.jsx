import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Orders-komponentti:
 * - listaa olemassa olevat orderit (GET /api/orders)
 * - mahdollistaa uuden tilauksen luomisen (receive tai ship)
 *   -> varasto päivittyy backendin puolella
 */
function Orders() {
  const [orders, setOrders] = useState([]); // Kaikki tilaukset
  const [items, setItems] = useState([]);   // Varaston itemit
  const [isCreating, setIsCreating] = useState(false);
  const [orderType, setOrderType] = useState('receive'); // 'receive' tai 'ship'
  const [selectedItems, setSelectedItems] = useState([]); 

  // Kaksi URL-vaihtoehtoa. Kommentoi / pois-kommentoi haluamasi rivi:
  // const baseUrl = "http://localhost:3001"; // PAIKALLINEN
  const baseUrl = "casperwms-gbedepega8afhhft.canadacentral-01.azurewebsites.net"; // AZURE-BACKEND

  // heti ensirenderöinnin jälkeen
  useEffect(() => {
    fetchOrders();
    fetchAllItems();
  }, []);

  // Hakee tilaukset
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error('Virhe haettaessa tilauksia:', err);
    }
  };

  // Hakee varaston itemit -> valitaan niistä tilauksen tuotteet
  const fetchAllItems = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/items`);
      setItems(res.data);
    } catch (err) {
      console.error('Virhe haettaessa itemeitä:', err);
    }
  };

  // Aloita uuden tilauksen luonti (receive/ship)
  const handleCreateOrderStart = (type) => {
    setOrderType(type);
    setSelectedItems([]); 
    setIsCreating(true);
  };

  // Käyttäjä syöttää itemId:lle qty
  const handleSelectItemQty = (itemId, name, qty) => {
    const idx = selectedItems.findIndex(si => si.itemId === itemId);
    if (idx !== -1) {
      // Päivitetään jo listalla olevaa
      const newArr = [...selectedItems];
      newArr[idx].quantity = qty;
      setSelectedItems(newArr);
    } else {
      // Uusi item
      setSelectedItems([...selectedItems, { itemId, name, quantity: qty }]);
    }
  };

  // POST /api/orders
  const handleSubmitOrder = async () => {
    try {
      // Ota vain >0 määrät
      const payloadItems = selectedItems
        .filter(si => si.quantity > 0)
        .map(si => ({
          item_id: si.itemId,
          quantity: si.quantity,
        }));

      if (payloadItems.length === 0) {
        alert('Valitse ainakin yksi item ja määräksi > 0');
        return;
      }

      await axios.post(`${baseUrl}/api/orders`, {
        type: orderType,
        items: payloadItems,
      });
      alert(`Luotiin uusi ${orderType} -tilaus! Varasto päivitetty.`);
      setIsCreating(false);

      // Päivitä tilauslista
      fetchOrders();
      // jos haluat päivittää items-lista, voit kutsua myös fetchAllItems()
    } catch (err) {
      console.error('Virhe luodessa tilausta:', err);
    }
  };

  return (
    <div className="orders">
      <h2>Orders</h2>

      {/* Napit uuden tilauksen luomiseen */}
      <button onClick={() => handleCreateOrderStart('receive')}>Receive Order</button>
      <button onClick={() => handleCreateOrderStart('ship')}>Ship Order</button>

      {isCreating && (
        <div className="create-order">
          <h3>Create {orderType === 'receive' ? 'Receive' : 'Ship'} Order</h3>
          <ul>
            {items.map(it => (
              <li key={it.id}>
                {it.name} (current qty: {it.quantity})
                <input
                  type="number"
                  min="0"
                  defaultValue={0}
                  onChange={(e) =>
                    handleSelectItemQty(it.id, it.name, parseInt(e.target.value, 10))
                  }
                />
              </li>
            ))}
          </ul>
          <button onClick={handleSubmitOrder}>Create Order</button>
          <button onClick={() => setIsCreating(false)}>Cancel</button>
        </div>
      )}

      <div className="orders-list">
        <h3>Existing Orders</h3>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Order #{order.id} – {order.type}, created: {order.created_at}
              {/* Voit laajentaa näyttämään order.items jne. */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Orders;



