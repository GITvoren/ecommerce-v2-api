const router = require('express').Router();
const productController = require('../controllers/productController.js');
const {
     getProducts,
     getActiveProducts,
     getProduct,
     addProduct,
     deleteProduct,
     updateProduct,
     archiveProduct,
     activateProduct

} = productController;

// Get All Products
router.get('/', getProducts);

// Get All Active Products
router.get('/active', getActiveProducts);

// Get Single Product
router.get('/:id', getProduct);

// Add Product
router.post('/', addProduct);

// Delete Product
router.delete('/:id', deleteProduct);

// Update Product
router.put('/:id', updateProduct);

// Archive Product (isActive -> false)
router.patch('/:id/archive', archiveProduct);

// Activate Product (isActive -> true)
router.patch('/:id/activate', activateProduct);


module.exports = router;