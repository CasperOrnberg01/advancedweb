// backend/routes/items.js
const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

//  Ohjaa CRUD reitit tuotteille
router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getItemById);
router.post('/', itemsController.addItem);
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;

