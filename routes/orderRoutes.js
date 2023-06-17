const router = require('express').Router();
const orderController = require('../controllers/orderController.js');

const {
     getOrders,
     createOrder
} = orderController


// Get All Orders
router.get('/', getOrders);

// Create Order
router.post('/', createOrder);


module.exports = router;