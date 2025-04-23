import React, { useEffect, useState } from 'react';
import axios from 'axios';


//Items komponentti tuotteiden hallitsemiseen
//Itemeiden lisäys lomake managerilla, sekä muokkaus ja poistonapit
//määrän muokkaus optio worker roolille
function Items({ userRole }) {
  // Tilat tuotteille, uuden tuotteen nimelle ja kuvaukselle
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState(''); //lomakkeen tila uuden itemin nimen lisäämiselle
  const [newItemDesc, setNewItemDesc] = useState(''); //lomakkeen tila uuden itemin kuvauksen lisäämiselle

  // HUOM: Kaksi URL-vaihtoehtoa: paikallinen vs. azure
  // Kommentoi / pois-kommentoi haluamasi rivi:
  
  // const baseUrl = "http://localhost:3001"; // PAIKALLINEN HOSTAUS
  const baseUrl = "https://casperwms-gbedepega8afhhft.canadacentral-01.azurewebsites.net"; // AZURE-HOSTATTU BACKEND

  // Haetaan tuotteet backendistä, kun komponentti ladataan ensimmäisen kerran
  useEffect(() => {
    fetchItems();
  }, []);

  // Funkio, joka hakee tuotteet axios-kutsulla backendin APIsta
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/items`);
      console.log('Fetched items:', response.data);
      setItems(response.data);
    } catch (error) {
      console.error('Virhe haettaessa tuotteita:', error);
    }
  };

  // Warehouse Manager: lisätään uusi itemi backendin POST -pyynnöllä
  const handleAddItem = async () => {
    if (!newItemName) return; // Jos tuotteen nimi on tyhjä, ei tehdä mitään
    try {
      // Lähetetään POST (nimi, määrä ja kuvaus)
      const response = await axios.post(`${baseUrl}/api/items`,{
        name: newItemName,
        quantity: 0,
        description: newItemDesc,
      });
      console.log('POST response:', response.data);
      // Lisätään uusi tuote tilaan, jolloin UI päivittyy
      setItems([...items, response.data]);
      setNewItemName('');
      setNewItemDesc('');
    } catch (error) {
      console.error('Virhe tuotetta lisättäessä:', error);
    }
  };

  // Warehouse Worker, muutaa tuotteen määrää
  const adjustQuantity = async (id, delta) => {
    // Etsitään tuote, jota halutaan muuttaa
    const item = items.find(item => item.id === id);
    if (!item) return;
    const updatedQuantity = item.quantity + delta;
    try {
      const response = await axios.put(`${baseUrl}/api/items/${id}`, {
        quantity: updatedQuantity,
      });
      // Päivitetään tila korvaamalla muokattu tuote
      const updatedItems = items.map(item =>
        item.id === id ? response.data : item
      );
      setItems(updatedItems);
    } catch (error) {
      console.error('Virhe määrän päivityksessä:', error);
    }
  };

  // Warehouse Worker muuttaa tuotteen määrää suoraan syötteellä
  const changeQuantity = async (id) => {
    const newQty = parseInt(prompt('Anna uusi määrä:'), 10);
    if (isNaN(newQty)) return; // Jos syöte ei ole numero, ei tehdä mitään
    try {
      const response = await axios.put(`${baseUrl}/api/items/${id}`, {
        quantity: newQty,
      });
      // päivitetään local lista
      const updatedItems = items.map(item =>
        item.id === id ? response.data : item
      );
      setItems(updatedItems);
    } catch (error) {
      console.error('Virhe määrän muuttamisessa:', error);
    }
  };

  // Warehouse Manager, tuotteen poisto
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/items/${id}`);
      console.log('DELETE response:', response.data);
      // Poistetaan tuote tilasta niin ja UI päivittyy
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Virhe tuotteen poistamisessa:', error);
    }
  };

  return (
    <div className="items">
      <h2>Tuotteet</h2>

      {/* Warehouse Manager -näkymä: Uuden tuotteen lisäämisen lomake */}
      {userRole === 'manager' && (
        <div className="add-item">
          <h3>Lisää uusi tuote</h3>
          <input
            type="text"
            placeholder="Tuotteen nimi"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Tuotteen kuvaus"
            value={newItemDesc}
            onChange={(e) => setNewItemDesc(e.target.value)}
          />
          <br />
          <button onClick={handleAddItem}>Lisää tuote</button>
        </div>
      )}

      {/* Warehouse Worker -näkymä: Näyttää tuotteet ja +- sekä change painike */}
      {userRole === 'worker' && (
        <div className="update-quantity">
          <h3>Päivitä tuotteen määrä</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> – Määrä: {item.quantity}
                <br />
                <em>Kuvaus:</em> {item.description}
                <br />
                <button onClick={() => adjustQuantity(item.id, 1)}>+</button>
                <button onClick={() => adjustQuantity(item.id, -1)}>-</button>
                <button onClick={() => changeQuantity(item.id)}>Change</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warehouse Manager -näkymä: Näyttää nykyiset tuotteet jossa myös delete painike on mukana */}
      {userRole === 'manager' && (
        <div className="items-list">
          <h3>Nykyiset tuotteet</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> – Määrä: {item.quantity}
                <br />
                <em>Kuvaus:</em> {item.description}
                <br />
                <button className="delete" onClick={() => deleteItem(item.id)}>Poista</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Items;
