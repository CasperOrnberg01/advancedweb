// backend/controllers/ordersController.js
const db = require('../config/db');

/**
 * Hae kaikki tilaukset. Liitä niihin order_items-rivit, jotta
 * front-end näkee tilauksiin kuuluvat tuotteet (item_id, quantity).
 */
exports.getAllOrders = async (req, res, next) => {
  try {
    // 1. Hae kaikki orders
    const ordersResult = await db.query('SELECT * FROM orders ORDER BY id');
    const orders = ordersResult.rows;

    // 2. Hae kaikki order_items
    const itemsResult = await db.query('SELECT * FROM order_items');
    const orderItems = itemsResult.rows;

    // 3. Liitä jokaiselle tilaukselle sen items
    orders.forEach(order => {
      order.items = orderItems.filter(oi => oi.order_id === order.id);
    });

    res.json(orders);
  } catch (error) {
    console.error("Virhe getAllOrders:", error);
    next(error);
  }
};

/**
 * Hae tietty tilaus ID:n perusteella ja liitä siihen order_items-rivit.
 */
exports.getOrderById = async (req, res, next) => {
  const orderId = parseInt(req.params.id, 10);
  try {
    const orderRes = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (orderRes.rows.length === 0) {
      return res.status(404).json({ error: 'Tilausta ei löytynyt' });
    }
    const order = orderRes.rows[0];

    const itemsRes = await db.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
    order.items = itemsRes.rows;

    res.json(order);
  } catch (error) {
    console.error("Virhe getOrderById:", error);
    next(error);
  }
};

/**
 * Luo uusi tilaus (type = 'receive' tai 'ship') ja lisää order_items-listaan
 * valitut tuotteet. Päivitä heti varaston määrä (items-taulussa).
 */
exports.addOrder = async (req, res, next) => {
  const { type, items } = req.body; // items = [{ item_id, quantity }, ...]
  try {
    // 1. Luo uusi tilaus orders-tauluun
    const orderResult = await db.query(
      'INSERT INTO orders (type) VALUES ($1) RETURNING *',
      [type]
    );
    const order = orderResult.rows[0];

    // 2. Lisää jokainen item order_items-tauluun ja päivitä varasto
    for (const it of items) {
      // Tallenna rivi order_items
      await db.query(
        'INSERT INTO order_items (order_id, item_id, quantity) VALUES ($1, $2, $3)',
        [order.id, it.item_id, it.quantity]
      );
      // Päivitä varaston määrä items-taulusta
      if (type === 'receive') {
        // Lisätään varastoon, eli tietokannan items;.
        await db.query('UPDATE items SET quantity = quantity + $1 WHERE id = $2', [it.quantity, it.item_id]);
      } else if (type === 'ship') {
        // Vähennetään varastosta, eli tietokannan items; tavaroita vähentyy
        await db.query('UPDATE items SET quantity = quantity - $1 WHERE id = $2', [it.quantity, it.item_id]);
      }
    }

    // 3. Hae order_items tallennettu data --> liitä order.items
    const itemsRes = await db.query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
    order.items = itemsRes.rows;

    res.status(201).json(order);
  } catch (error) {
    console.error("Virhe addOrder:", error);
    next(error);
  }
};


// Pohja olemassa olevan tilauksen päivittämiselle
exports.updateOrder = async (req, res, next) => {
  const orderId = parseInt(req.params.id, 10);
  try {
    const orderRes = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (orderRes.rows.length === 0) {
      return res.status(404).json({ error: 'Tilausta ei löytynyt' });
    }
    const order = orderRes.rows[0];
    const itemsRes = await db.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
    order.items = itemsRes.rows;
    res.json(order);
  } catch (error) {
    console.error("Virhe updateOrder:", error);
    next(error);
  }
};


//Poista tilaus toiminnallisuus
exports.deleteOrder = async (req, res, next) => {
  const orderId = parseInt(req.params.id, 10);
  try {
    const result = await db.query('DELETE FROM orders WHERE id = $1 RETURNING *', [orderId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Tilausta ei löytynyt' });
    }
  } catch (error) {
    console.error("Virhe deleteOrder:", error);
    next(error);
  }
};
