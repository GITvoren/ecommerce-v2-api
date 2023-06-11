const router = require('express').Router();
const categoryController = require('../controllers/categoryController.js');
const {
     getCategories,
     addCategory,
     deleteCategory,
     getCategory,
     updateCategory

} = categoryController;

router.get('/', getCategories);

router.post('/', addCategory);

router.get('/:id', getCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);


module.exports = router;