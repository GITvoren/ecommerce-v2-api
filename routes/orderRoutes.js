const router = require('express').Router();
const orderController = require('../controllers/orderController.js');

const {
     getOrders
} = orderController

router.get('/', getOrders);


module.exports = router;