const router = require('express').Router();
const userController = require('../controllers/userController.js');


const {
     getUsers,
     registerUser,
     loginUser,
     setAdmin
} = userController;


router.get('/', getUsers);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.patch('/:id/setadmin', setAdmin);




module.exports = router;