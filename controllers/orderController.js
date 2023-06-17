const Order = require('../models/Order.js');



const getOrders = (req, res) => {
     Order.find({})
     .then(orders => res.json(orders))
     .catch(() => res.sendStatus(500));
}


const createOrder = (req, res) => {
     
}


module.exports = {
     getOrders,
     createOrder
}