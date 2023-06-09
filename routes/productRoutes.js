const router = require('express').Router();
const productController = require('../controllers/productController.js');
const {
     getProducts
} = productController;


router.get('/', getProducts);


module.exports = router;