const router = require('express').Router();
const authController = require('../App/Controllers/authController');
const userController = require('../App/Controllers/userController');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.route('/').get(userController.allUsers);

router.route('/:id').get(userController.getUser);


module.exports = router;