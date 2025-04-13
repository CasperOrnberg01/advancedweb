// backend/config/db.js
const { Pool } = require('pg');
//require('dotenv').config();   for local
//azure test below
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
//Pool luo yhteyden pgSQL db urlin avulla
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Sallii azuren SSL-sertifikaatin käytön ilman varmenteita
  }
});

// apufunktio välittämään poolin query-komennon
module.exports = {
  query: (text, params) => pool.query(text, params),
};
