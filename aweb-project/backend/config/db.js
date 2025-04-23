// backend/config/db.js
console.log('>>> process.env.DATABASE_URL =', process.env.DATABASE_URL); //azure test line
const { Pool } = require('pg');
require('dotenv').config();

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
