const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path')

const port = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Fetch index.html from "public" directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Connect to database

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) 
    {
    console.error('Database error:', err.message);
  } 
  else 
  {
    console.log('Connection to database working');
  }});



// If table doesn't exist, create one

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  age INTEGER,
  gender TEXT CHECK(gender IN ('mies', 'nainen', 'muu'))
);`);




// Create new user

app.post('/users', (req, res) => {
  const { name, email, age, gender } = req.body;
  if (!name || !email || !age || !gender) {
    return res.status(400).json({ error: 'Name, email, age and gender required' });
  }
  
   // Validating email to be in @ form
   if (!email.includes('@')) {
    return res.status(400).json({ error: 'Sähköpostin tulee sisältää @-merkki' });
  }
  
  // validating age to be between 0-110
  if (age < 0 || age > 110) {
    return res.status(400).json({ error: 'Iän tulee olla 0-110 väliltä' });
  }

  const query = `INSERT INTO users (name, email, age, gender) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, email, age, gender], function (err) {
    if (err) 
      {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, age, gender });
  });
});

// Get users
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) 
        {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

  // Update user's information
app.put('/users/:id', (req, res) => {

  const { name, email, age, gender } = req.body;
  const { id } = req.params;

  if (!name || !email || !age || !gender) { return res.status(400).json({ error: 'Name, email, age and gender required' }); }

  const query = `UPDATE users SET name = ?, email = ?, age = ?, gender = ? WHERE id = ?`;
  db.run(query, [name, email, age, gender, id], function (err) {
    if (err) 
      {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) 
      {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'Users info updated', id });
  });
});


// Delete existing user

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
    if (err) 
      {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) 
      {
      return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
    }
    res.json({ message: 'Käyttäjä poistettu', id });
  });
});

// Start server

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});