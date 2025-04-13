// backend/app.js
require('dotenv').config();
//azure test below
//if (process.env.NODE_ENV !== 'production') {
  //require('dotenv').config();}
const express = require('express');
const cors = require('cors');

const app = express();

// Käytetään middlewarejä: JSON-pyyntöjen parsing ja CORS
app.use(express.json());
app.use(cors());

// Testireitti testaamaan palvelimen vastausta
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Liitetään tuotteiden reitit
const itemsRoutes = require('./routes/items');
app.use('/api/items', itemsRoutes); //ohjaa pyynnöt items.js reitille

// reitit orders käsittelyyn
const ordersRoutes = require('./routes/orders');
app.use('/api/orders', ordersRoutes); //ohjaa pyynnöt orders.js reitille

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend-palvelin käynnissä portissa ${PORT}`);
});
