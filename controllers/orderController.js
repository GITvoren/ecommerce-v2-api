const Order = require('../models/Order.js');
const OrderItem = require('../models/OrderItem.js');



const getOrders = (req, res) => {
     Order.find({}).populate(
          [
               {
                    path: 'orderItems',
                    populate: {
                         path: 'product',
                         select: '_id name price'
                    }
               },
               {
                    path: 'orderedBy',
                    select: '_id email'
               }
          ]
     )
     .then(orders => res.json(orders))
     .catch(() => res.sendStatus(500));
}


const createOrder = async (req, res) => {
     const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
          let newOrderItem = new OrderItem({
               quantity: orderItem.quantity,
               product: orderItem.product
          })

          newOrderItem = await newOrderItem.save();

          return newOrderItem._id;
     }))

     const orderItemsIdsResolved = await orderItemsIds;
     
     let newOrder = new Order({
          orderItems: orderItemsIdsResolved,
          totalAmount: req.body.totalAmount,
          orderedBy: req.body.orderedBy
     })

     newOrder = await newOrder.save();

     res.json(newOrder)
     
}


module.exports = {
     getOrders,
     createOrder
}