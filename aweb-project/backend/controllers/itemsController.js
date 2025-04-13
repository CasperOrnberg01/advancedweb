// backend/controllers/itemsController.js
const db = require('../config/db');

// Hae kaikki tuotteet tietokannasta
exports.getAllItems = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM items ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error("Virhe getAllItemsissä:", error);
    next(error);
  }
};

// Hae yksittäinen tuote ID:n perusteella
exports.getItemById = async (req, res, next) => {
  const itemId = parseInt(req.params.id, 10);
  try {
    const result = await db.query('SELECT * FROM items WHERE id = $1', [itemId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Tuotetta ei löytynyt' }); //palauttaa 404, jos tuotetta ei ole
    }
  } catch (error) {
    console.error("Virhe getItemByIdissä:", error);
    next(error);
  }
};

// Lisää uusi tuote tietokantaan
exports.addItem = async (req, res, next) => {
  const { name, quantity, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO items (name, quantity, description) VALUES ($1, $2, $3) RETURNING *',
      [name, quantity, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Virhe addItemissä:", error);
    next(error);
  }
};

// Päivitä tuotteen tietoja tietokannassa
exports.updateItem = async (req, res, next) => {
  const itemId = parseInt(req.params.id, 10);
  const { name, quantity, description } = req.body;
  try {
    const result = await db.query(
      'UPDATE items SET name = COALESCE($1, name), quantity = COALESCE($2, quantity), description = COALESCE($3, description) WHERE id = $4 RETURNING *',
      [name, quantity, description, itemId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Tuotetta ei löytynyt' });
    }
  } catch (error) {
    console.error("Virhe updateItemissä:", error);
    next(error);
  }
};

// Poista tuote tietokannasta
exports.deleteItem = async (req, res, next) => {
  const itemId = parseInt(req.params.id, 10);
  try {
    const result = await db.query('DELETE FROM items WHERE id = $1 RETURNING *', [itemId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Tuotetta ei löytynyt' });
    }
  } catch (error) {
    console.error("Virhe deleteItemissä:", error);
    next(error);
  }
};

  