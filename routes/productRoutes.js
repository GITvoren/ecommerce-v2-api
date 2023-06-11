const router = require('express').Router();
const productController = require('../controllers/productController.js');
const {
     getProducts,
     addProduct,
     deleteProduct,
     updateProduct

} = productController;


router.get('/', getProducts);

router.post('/', addProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);


module.exports = router;