// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const usersRoutes = require('./routes/users'); //users reitit (phase3)

// Käytetään middlewarejä: JSON-pyyntöjen parsing ja CORS
app.use(express.json());
app.use(cors());

app.use('/api/users', usersRoutes); // rekisteröi users reitit (phase3)

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
