const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { login, getUsers, signup } = require('../controllers/users-controllers');

router.get('/getusers', getUsers);

router.post('/login', login);

router.post(
  '/signup',
  [
    check('username').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup
);

module.exports = router;
