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
     activateProduct,
     countAllProducts,
     countActiveProducts

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

// Count All Products
router.get('/get/count', countAllProducts);

// Count All Active Products
router.get('/get/count/active', countActiveProducts);

module.exports = router;