const router = require('express').Router();
const authController = require('../App/Controllers/authController');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.route('/').get(authController.allUsers);


router.route('/:id').get(authController.getUser);


module.exports = router;