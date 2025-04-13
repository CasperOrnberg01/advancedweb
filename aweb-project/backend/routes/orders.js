// routes/orders.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Hae kaikki tilaukset
router.get('/', ordersController.getAllOrders);

// Hae yksittäinen tilaus ID:n perusteella
router.get('/:id', ordersController.getOrderById);

// Lisää uusi tilaus
router.post('/', ordersController.addOrder);

// Päivitä tilaus (esim. muokataan määriä)
router.put('/:id', ordersController.updateOrder);

// Poista tilaus
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
