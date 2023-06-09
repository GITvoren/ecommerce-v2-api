const router = require('express').Router();
const userController = require('../controllers/userController.js');
const {
     getUsers
} = userController;


router.get('/', getUsers);


module.exports = router;