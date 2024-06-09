const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController.js');

router.post('/register',
    [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 4 })
    ],
    userController.register
);

router.post('/login',
    [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').exists()
    ],
    userController.login
);

module.exports = router;