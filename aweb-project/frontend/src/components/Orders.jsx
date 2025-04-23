import React, { useState, useEffect } from 'react';
import axios from 'axios';


//Orders-komponentti:
 //listaa olemassa olevat orderit
 //mahdollistaa uuden tilauksen luomisen (receive tai ship)
 // varaston (itemeiden määrä päivittyy backendiin kun tilaus tehdään
function Orders() {
  const [orders, setOrders] = useState([]); // Kaikki tilaukset
  const [items, setItems] = useState([]);   // Varaston itemit
  const [isCreating, setIsCreating] = useState(false);
  const [orderType, setOrderType] = useState('receive'); // 'receive' tai 'ship'
  const [selectedItems, setSelectedItems] = useState([]); // sekectedItems: valittu itemId, nimi, määrä (qty)

  // const baseUrl = "http://localhost:3001"; // PAIKALLINEN
  const baseUrl = "https://casperwms-gbedepega8afhhft.canadacentral-01.azurewebsites.net"; // AZURE-BACKEND

  //kutsutaan fetchOrders ja fetchAllItems kun komponentti mountataan
  useEffect(() => {
    fetchOrders();
    fetchAllItems();
  }, []);

  //hakee jo luodut tilaukset
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error('Virhe haettaessa tilauksia:', err);
    }
  };

 //hakee varastossa olevat itemit
  //Tilaukseen voi lisätä tuotteita varaston itemeiden perusteella
  const fetchAllItems = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/items`);
      setItems(res.data);
    } catch (err) {
      console.error('Virhe haettaessa itemeitä:', err);
    }
  };

  // Aloita uuden tilauksen luonti
  const handleCreateOrderStart = (type) => {
    setOrderType(type);
    setSelectedItems([]); 
    setIsCreating(true);
  };

  // Käyttäjä syöttää itemin määrän
  const handleSelectItemQty = (itemId, name, qty) => {
    // Etsi onko item jo selectedItems-listassa
    const idx = selectedItems.findIndex(si => si.itemId === itemId);
    if (idx !== -1) {
      // Päivitetään jo listalla olevaa
      const newArr = [...selectedItems];
      newArr[idx].quantity = qty;
      setSelectedItems(newArr);
    } else {
      //lisätään uusi item valittuihin
      setSelectedItems([...selectedItems, { itemId, name, quantity: qty }]);
    }
  };

    // Lähetä POST /api/orders
  const handleSubmitOrder = async () => {
    try {
      // ota vain ne, joiden määrä > 0
      const payloadItems = selectedItems
        .filter(si => si.quantity > 0)
        .map(si => ({
          item_id: si.itemId, //rungoksi itemId ja quantity
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



